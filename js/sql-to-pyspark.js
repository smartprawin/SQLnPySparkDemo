/*
 * SQL -> PySpark (DataFrame API) translator.
 * Covers the lesson subset:
 *   SELECT [DISTINCT] cols FROM table [alias]
 *   [INNER|LEFT|RIGHT|FULL|CROSS] JOIN table [alias] ON <cond>
 *   WHERE <expr>
 *   GROUP BY cols  HAVING <expr>
 *   ORDER BY col [ASC|DESC]
 *   LIMIT n
 *   window functions: FUNC(...) OVER (PARTITION BY ... ORDER BY ...)
 * Subqueries and CTEs are NOT supported -> convertSqlToPySpark returns null.
 */
(function (global) {
  "use strict";

  const AGG_FUNCS = new Set(["COUNT", "SUM", "AVG", "MIN", "MAX"]);
  const WIN_FUNCS = new Set([
    "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE",
    "LAG", "LEAD", "SUM", "AVG", "MIN", "MAX", "COUNT"
  ]);

  // ---------- Tokenizer ----------
  function tokenize(sql) {
    const tokens = [];
    let i = 0;
    const n = sql.length;
    const isIdStart = (c) => /[A-Za-z_]/.test(c);
    const isId = (c) => /[A-Za-z0-9_]/.test(c);
    while (i < n) {
      const c = sql[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "-" && sql[i + 1] === "-") { while (i < n && sql[i] !== "\n") i++; continue; }
      if (c === "'") {
        let j = i + 1, s = "";
        while (j < n) {
          if (sql[j] === "'" && sql[j + 1] === "'") { s += "'"; j += 2; continue; }
          if (sql[j] === "'") break;
          s += sql[j]; j++;
        }
        tokens.push({ t: "str", v: s });
        i = j + 1; continue;
      }
      if (c === '"') {
        let j = i + 1, s = "";
        while (j < n && sql[j] !== '"') { s += sql[j]; j++; }
        tokens.push({ t: "id", v: s });
        i = j + 1; continue;
      }
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(sql[i + 1] || ""))) {
        let j = i, s = "";
        while (j < n && /[0-9.]/.test(sql[j])) { s += sql[j]; j++; }
        tokens.push({ t: "num", v: s }); i = j; continue;
      }
      if (isIdStart(c)) {
        let j = i, s = "";
        while (j < n && isId(sql[j])) { s += sql[j]; j++; }
        tokens.push({ t: "id", v: s }); i = j; continue;
      }
      const two = sql.substr(i, 2);
      if (two === "<>" || two === "!=" || two === "<=" || two === ">=") {
        tokens.push({ t: "op", v: two }); i += 2; continue;
      }
      if ("=<>()*,.".includes(c)) { tokens.push({ t: "op", v: c }); i++; continue; }
      // unknown char -> skip
      i++;
    }
    return tokens;
  }

  // ---------- Parser ----------
  function Parser(tokens) {
    this.toks = tokens;
    this.pos = 0;
  }
  Parser.prototype.peek = function () { return this.toks[this.pos]; };
  Parser.prototype.next = function () { return this.toks[this.pos++]; };
  Parser.prototype.eof = function () { return this.pos >= this.toks.length; };
  Parser.prototype.isKw = function (kw) {
    const t = this.peek();
    return t && t.t === "id" && t.v.toUpperCase() === kw;
  };
  Parser.prototype.eatKw = function (kw) {
    if (!this.isKw(kw)) throw new Error("Expected " + kw);
    this.next();
  };
  Parser.prototype.eatOp = function (op) {
    const t = this.peek();
    if (!t || t.t !== "op" || t.v !== op) throw new Error("Expected " + op);
    this.next();
  };
  Parser.prototype.parseName = function () {
    const t = this.next();
    if (!t || t.t !== "id") throw new Error("Expected identifier");
    return t.v;
  };

  Parser.prototype.parseTableRef = function () {
    const name = this.parseName();
    let alias = null;
    if (this.isKw("AS")) { this.next(); alias = this.parseName(); }
    else if (this.peek() && this.peek().t === "id" && !this.isKw("JOIN") &&
             !this.isKw("WHERE") && !this.isKw("GROUP") && !this.isKw("ORDER") &&
             !this.isKw("LIMIT") && !this.isKw("HAVING") && !this.isKw("ON")) {
      alias = this.parseName();
    }
    return { table: name, alias: alias };
  };

  Parser.prototype.parseColRef = function () {
    let table = null;
    let name = this.parseName();
    if (this.peek() && this.peek().t === "op" && this.peek().v === ".") {
      this.next();
      table = name;
      name = this.parseName();
    }
    return { type: "col", table: table, name: name };
  };

  Parser.prototype.parseLiteral = function () {
    const t = this.peek();
    if (!t) throw new Error("Expected literal");
    if (t.t === "str") { this.next(); return { type: "lit", kind: "string", value: t.v }; }
    if (t.t === "num") { this.next(); return { type: "lit", kind: "number", value: t.v }; }
    throw new Error("Expected literal");
  };

  Parser.prototype.parseOperand = function () {
    const t = this.peek();
    if (!t) throw new Error("Unexpected end");
    if (t.t === "op" && t.v === "(") {
      this.next();
      if (this.isKw("SELECT")) throw new Error("Subqueries not supported");
      const e = this.parseOr();
      this.eatOp(")");
      return e;
    }
    if (t.t === "str" || t.t === "num") return this.parseLiteral();
    // function call or column
    if (t.t === "id" && this.toks[this.pos + 1] && this.toks[this.pos + 1].t === "op" && this.toks[this.pos + 1].v === "(") {
      const fname = t.v.toUpperCase();
      this.next(); this.eatOp("(");
      // could be COUNT(*) etc
      let arg = null;
      if (this.peek() && this.peek().t === "op" && this.peek().v === "*") {
        this.next(); arg = { type: "star" };
      } else if (!this.eof() && !(this.peek().t === "op" && this.peek().v === ")")) {
        arg = this.parseColRef();
      }
      this.eatOp(")");
      let over = null;
      if (this.isKw("OVER")) {
        this.next(); this.eatOp("(");
        over = this.parseWindowSpec();
        this.eatOp(")");
      }
      return { type: "func", func: fname, arg: arg, over: over };
    }
    return this.parseColRef();
  };

  Parser.prototype.parseWindowSpec = function () {
    let partition = [], order = [];
    while (!this.eof()) {
      if (this.isKw("PARTITION")) {
        this.next(); this.eatKw("BY");
        while (this.peek() && !(this.isKw("ORDER")) &&
               !(this.peek().t === "op" && this.peek().v === ")")) {
          partition.push(this.parseColRef().name);
          if (this.peek() && this.peek().t === "op" && this.peek().v === ",") this.next();
          else break;
        }
      } else if (this.isKw("ORDER")) {
        this.next(); this.eatKw("BY");
        while (this.peek() && !(this.peek().t === "op" && this.peek().v === ")")) {
          const c = this.parseColRef();
          let dir = "ASC";
          if (this.isKw("ASC")) { this.next(); }
          else if (this.isKw("DESC")) { this.next(); dir = "DESC"; }
          order.push({ name: c.name, dir: dir });
          if (this.peek() && this.peek().t === "op" && this.peek().v === ",") this.next();
          else break;
        }
      } else break;
    }
    return { partition: partition, order: order };
  };

  Parser.prototype.parseComparison = function () {
    const left = this.parseOperand();
    const t = this.peek();
    if (!t) throw new Error("Expected operator");
    // postfix specials
    if (this.isKw("IS")) {
      this.next();
      let neg = false;
      if (this.isKw("NOT")) { this.next(); neg = true; }
      this.eatKw("NULL");
      return { op: neg ? "isnotnull" : "isnull", left: left };
    }
    if (this.isKw("IN")) {
      this.next(); this.eatOp("(");
      const list = [];
      while (!this.eof() && !(this.peek().t === "op" && this.peek().v === ")")) {
        list.push(this.parseOperand());
        if (this.peek() && this.peek().t === "op" && this.peek().v === ",") this.next();
        else break;
      }
      this.eatOp(")");
      return { op: "in", left: left, list: list };
    }
    if (this.isKw("LIKE") || this.isKw("ILIKE")) {
      const neg = this.isKw("NOT");
      if (neg) this.next();
      this.next(); // LIKE
      const pat = this.parseOperand();
      return { op: neg ? "notlike" : "like", left: left, right: pat };
    }
    if (this.isKw("BETWEEN")) {
      const neg = this.isKw("NOT");
      if (neg) this.next();
      this.next(); // BETWEEN
      const low = this.parseOperand();
      this.eatKw("AND");
      const high = this.parseOperand();
      return { op: neg ? "notbetween" : "between", left: left, low: low, high: high };
    }
    if (t.t === "op" && ["=", "<>", "!=", "<", ">", "<=", ">="].includes(t.v)) {
      this.next();
      const right = this.parseOperand();
      return { op: t.v, left: left, right: right };
    }
    throw new Error("Unsupported operator/expression");
  };

  Parser.prototype.parseNot = function () {
    if (this.isKw("NOT")) { this.next(); return { op: "not", expr: this.parseNot() }; }
    return this.parseComparison();
  };
  Parser.prototype.parseAnd = function () {
    let left = this.parseNot();
    while (this.isKw("AND")) {
      this.next();
      const right = this.parseNot();
      left = { op: "and", left: left, right: right };
    }
    return left;
  };
  Parser.prototype.parseOr = function () {
    let left = this.parseAnd();
    while (this.isKw("OR")) {
      this.next();
      const right = this.parseAnd();
      left = { op: "or", left: left, right: right };
    }
    return left;
  };

  Parser.prototype.parseSelectList = function () {
    if (this.peek() && this.peek().t === "op" && this.peek().v === "*") {
      this.next();
      return [{ type: "star" }];
    }
    const items = [];
    while (true) {
      const item = this.parseSelectItem();
      items.push(item);
      if (this.peek() && this.peek().t === "op" && this.peek().v === ",") { this.next(); continue; }
      break;
    }
    return items;
  };

  Parser.prototype.parseSelectItem = function () {
    const operand = this.parseOperand(); // col, func, or *
    if (operand.type === "star") return { type: "star" };
    let alias = null;
    if (this.isKw("AS")) { this.next(); alias = this.parseName(); }
    else if (this.peek() && this.peek().t === "id" &&
             !this.isKw("FROM") && !this.isKw("WHERE") && !this.isKw("GROUP") &&
             !this.isKw("ORDER") && !this.isKw("LIMIT") && !this.isKw("HAVING") &&
             !this.isKw("JOIN")) {
      alias = this.parseName();
    }
    if (operand.type === "col") return { type: "col", name: operand.name, alias: alias };
    if (operand.type === "func") return { type: "func", func: operand.func, arg: operand.arg, over: operand.over, alias: alias || (operand.arg && operand.arg.name) || operand.func.toLowerCase() };
    throw new Error("Unsupported select item");
  };

  Parser.prototype.parseJoin = function () {
    let jt = "inner";
    if (this.isKw("LEFT")) { this.next(); jt = "left"; if (this.isKw("OUTER")) this.next(); }
    else if (this.isKw("RIGHT")) { this.next(); jt = "right"; if (this.isKw("OUTER")) this.next(); }
    else if (this.isKw("FULL")) { this.next(); jt = "full"; if (this.isKw("OUTER")) this.next(); }
    else if (this.isKw("CROSS")) { this.next(); jt = "cross"; }
    else if (this.isKw("INNER")) { this.next(); jt = "inner"; }
    this.eatKw("JOIN");
    const ref = this.parseTableRef();
    let on = null;
    if (jt !== "cross") {
      this.eatKw("ON");
      on = this.parseOr();
    }
    return { type: jt, table: ref.table, alias: ref.alias, on: on };
  };

  Parser.prototype.parse = function () {
    this.eatKw("SELECT");
    let distinct = false;
    if (this.isKw("DISTINCT")) { this.next(); distinct = true; }
    const columns = this.parseSelectList();
    this.eatKw("FROM");
    if (this.isKw("(")) throw new Error("Subqueries not supported");
    const from = this.parseTableRef();
    const joins = [];
    while (this.isKw("JOIN") || this.isKw("INNER") || this.isKw("LEFT") ||
           this.isKw("RIGHT") || this.isKw("FULL") || this.isKw("CROSS")) {
      joins.push(this.parseJoin());
    }
    let where = null;
    if (this.isKw("WHERE")) { this.next(); where = this.parseOr(); }
    let groupBy = [];
    if (this.isKw("GROUP")) {
      this.next(); this.eatKw("BY");
      while (true) {
        groupBy.push(this.parseColRef().name);
        if (this.peek() && this.peek().t === "op" && this.peek().v === ",") { this.next(); continue; }
        break;
      }
    }
    let having = null;
    if (this.isKw("HAVING")) { this.next(); having = this.parseOr(); }
    let orderBy = [];
    if (this.isKw("ORDER")) {
      this.next(); this.eatKw("BY");
      while (true) {
        const c = this.parseColRef();
        let dir = "ASC";
        if (this.isKw("ASC")) this.next();
        else if (this.isKw("DESC")) { this.next(); dir = "DESC"; }
        orderBy.push({ name: c.name, dir: dir });
        if (this.peek() && this.peek().t === "op" && this.peek().v === ",") { this.next(); continue; }
        break;
      }
    }
    let limit = null;
    if (this.isKw("LIMIT")) { this.next(); limit = this.parseLiteral().value; }
    return { distinct, columns, from, joins, where, groupBy, having, orderBy, limit };
  };

  // ---------- Emitter ----------
  let AGG_MAP = {};

  function litPy(lit) {
    if (lit.kind === "string") return '"' + lit.value.replace(/"/g, '\\"') + '"';
    return lit.value;
  }
  function colPy(col) {
    if (col.table) return col.table + '["' + col.name + '"]';
    return 'F.col("' + col.name + '")';
  }
  function exprPy(e) {
    if (!e) return "None";
    if (e.type === "col") return colPy(e);
    if (e.type === "lit") return litPy(e);
    if (e.type === "func") {
      if (e.over) return funcPy(e) + ".over(w" + e._wid + ")";
      if (AGG_FUNCS.has(e.func)) {
        const key = e.func + "|" + (e.arg && e.arg.type === "star" ? "*" : (e.arg ? e.arg.name : ""));
        if (AGG_MAP[key]) return 'F.col("' + AGG_MAP[key] + '")';
      }
      return funcPy(e);
    }
    if (e.type === "star") return '"*"';
    switch (e.op) {
      case "=": return "(" + exprPy(e.left) + " == " + exprPy(e.right) + ")";
      case "<>":
      case "!=": return "(" + exprPy(e.left) + " != " + exprPy(e.right) + ")";
      case "<": case ">": case "<=": case ">=":
        return "(" + exprPy(e.left) + " " + e.op + " " + exprPy(e.right) + ")";
      case "and": return "(" + exprPy(e.left) + " & " + exprPy(e.right) + ")";
      case "or": return "(" + exprPy(e.left) + " | " + exprPy(e.right) + ")";
      case "not": return "(~" + exprPy(e.expr) + ")";
      case "in":
        return "(" + exprPy(e.left) + ".isin(" + e.list.map(litPy).join(", ") + "))";
      case "like": return "(" + exprPy(e.left) + '.like("' + e.right.value + '"))';
      case "notlike": return "(~" + exprPy(e.left) + '.like("' + e.right.value + '"))';
      case "isnull": return "(" + exprPy(e.left) + ".isNull())";
      case "isnotnull": return "(" + exprPy(e.left) + ".isNotNull())";
      case "between": return "((" + exprPy(e.left) + " >= " + exprPy(e.low) + ") & (" + exprPy(e.left) + " <= " + exprPy(e.high) + "))";
      case "notbetween": return "((" + exprPy(e.left) + " < " + exprPy(e.low) + ") | (" + exprPy(e.left) + " > " + exprPy(e.high) + "))";
    }
    throw new Error("Cannot emit expression");
  }
  function funcPy(f) {
    const fname = f.func;
    if (f.arg && f.arg.type === "star") {
      return "F." + fname.toLowerCase() + '("*")';
    }
    if (["ROW_NUMBER", "RANK", "DENSE_RANK"].includes(fname)) {
      return "F." + fname.toLowerCase() + "()";
    }
    if (["LAG", "LEAD"].includes(fname)) {
      const arg = f.arg ? exprPy(f.arg) : "F.col(?)";
      return "F." + fname.toLowerCase() + "(" + arg + ")";
    }
    if (f.arg) return "F." + fname.toLowerCase() + "(" + exprPy(f.arg) + ")";
    return "F." + fname.toLowerCase() + "()";
  }

  function convertSqlToPySpark(sql) {
    let ast;
    try {
      const toks = tokenize(sql);
      const p = new Parser(toks);
      ast = p.parse();
      if (!p.eof()) throw new Error("Trailing tokens");
    } catch (err) {
      return null;
    }

    AGG_MAP = {};
    ast.columns.forEach((c) => {
      if (c.type === "func" && !c.over && AGG_FUNCS.has(c.func)) {
        const key = c.func + "|" + (c.arg && c.arg.type === "star" ? "*" : (c.arg ? c.arg.name : ""));
        AGG_MAP[key] = c.alias || c.func.toLowerCase();
      }
    });

    const varOf = (ref) => ref.alias || ref.table;
    const usedTables = [];
    usedTables.push({ var: varOf(ast.from), table: ast.from.table });
    ast.joins.forEach((j) => usedTables.push({ var: varOf(j), table: j.table }));

    let hasWindow = false;
    let wid = 0;
    ast.columns.forEach((c) => {
      if (c.type === "func" && c.over) { c.over._wid = ++wid; hasWindow = true; }
    });

    const lines = [];
    lines.push("# PySpark equivalent (DataFrame API)");
    lines.push("from pyspark.sql import functions as F");
    if (hasWindow) lines.push("from pyspark.sql.window import Window");
    lines.push("");
    usedTables.forEach((t) => {
      lines.push(t.var + ' = spark.table("' + t.table + '")');
    });
    lines.push("");

    const base = ast.from.alias || ast.from.table;
    let chain = [base];

    // joins
    ast.joins.forEach((j) => {
      const jv = j.alias || j.table;
      const onExpr = j.on ? exprPy(j.on) : "None";
      chain.push('.join(' + jv + ", " + onExpr + ', "' + j.type + '")');
    });

    // where
    if (ast.where) chain.push(".filter(" + exprPy(ast.where) + ")");

    // aggregation vs select
    const hasAgg = ast.groupBy.length > 0 ||
      ast.columns.some((c) => c.type === "func" && !c.over && AGG_FUNCS.has(c.func));
    const hasWindowOnly = !hasAgg && ast.columns.some((c) => c.type === "func" && c.over);

    if (hasAgg) {
      const keys = ast.groupBy.map((g) => 'F.col("' + g + '")');
      const aggs = [];
      ast.columns.forEach((c) => {
        if (c.type === "func" && !c.over && AGG_FUNCS.has(c.func)) {
          aggs.push(funcPy(c) + '.alias("' + (c.alias || c.func.toLowerCase()) + '")');
        }
      });
      chain.push(".groupBy(" + keys.join(", ") + ")");
      chain.push(".agg(\n    " + aggs.join(",\n    ") + "\n)");
      if (ast.having) chain.push(".filter(" + exprPy(ast.having) + ")");
    } else if (hasWindowOnly) {
      ast.columns.forEach((c) => {
        if (c.type === "func" && c.over) {
          chain.push('.withColumn("' + (c.alias || c.func.toLowerCase()) + '", ' +
            funcPy(c) + ".over(w" + c.over._wid + "))");
        }
      });
    }

    // select (non-agg, non-window-only)
    if (!hasAgg && !hasWindowOnly) {
      const sel = ast.columns.map((c) => {
        if (c.type === "star") return '"*"';
        if (c.type === "col") {
          return c.alias ? colPy(c) + '.alias("' + c.alias + '")' : colPy(c);
        }
        return colPy({ name: c.alias || c.name });
      });
      if (ast.distinct) chain.push(".distinct()");
      chain.push(".select(" + sel.join(", ") + ")");
    } else if (hasWindowOnly) {
      // select original projection including window aliases + base cols
      const sel = ast.columns.map((c) => {
        if (c.type === "star") return '"*"';
        if (c.type === "func" && c.over) return 'F.col("' + (c.alias || c.func.toLowerCase()) + '")';
        if (c.type === "col") return c.alias ? colPy(c) + '.alias("' + c.alias + '")' : colPy(c);
        return colPy({ name: c.alias || c.name });
      });
      chain.push(".select(" + sel.join(", ") + ")");
    }

    // order by
    if (ast.orderBy.length) {
      const ob = ast.orderBy.map((o) =>
        'F.col("' + o.name + '").' + (o.dir === "DESC" ? "desc()" : "asc()"));
      chain.push(".orderBy(" + ob.join(", ") + ")");
    }
    if (ast.limit) chain.push(".limit(" + ast.limit + ")");

    // window specs
    const winLines = [];
    ast.columns.forEach((c) => {
      if (c.type === "func" && c.over) {
        const w = c.over;
        let s = "w" + w._wid + ' = Window';
        s += w.partition.length ? '.partitionBy("' + w.partition.join('", "') + '")' : "";
        s += w.order.length ? ".orderBy(" + w.order.map((o) =>
          'F.col("' + o.name + '").' + (o.dir === "DESC" ? "desc()" : "asc()")).join(", ") + ")" : "";
        winLines.push(s);
      }
    });

    const out = [];
    out.push(lines.join("\n"));
    if (winLines.length) { out.push(""); out.push(winLines.join("\n")); }
    out.push("");
    out.push("result = (" + chain.join("\n    ") + ")");
    out.push("result.show()");
    return out.join("\n");
  }

  global.convertSqlToPySpark = convertSqlToPySpark;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { convertSqlToPySpark };
  }
})(typeof window !== "undefined" ? window : globalThis);
