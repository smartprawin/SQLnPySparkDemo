const EXAMPLES = [
  {
    label: "SELECT + WHERE",
    sql: "SELECT name, age\nFROM users\nWHERE age >= 18 AND country = 'US';"
  },
  {
    label: "JOIN",
    sql: "SELECT o.order_id, c.name, o.amount\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nWHERE o.amount > 100;"
  },
  {
    label: "GROUP BY + HAVING",
    sql: "SELECT country, COUNT(*) AS users, AVG(age) AS avg_age\nFROM users\nGROUP BY country\nHAVING COUNT(*) > 10;"
  },
  {
    label: "ORDER BY + LIMIT",
    sql: "SELECT name, age\nFROM users\nORDER BY age DESC\nLIMIT 3;"
  },
  {
    label: "Window function",
    sql: "SELECT customer_id, order_date, amount,\n       SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total\nFROM orders;"
  }
];

window.addEventListener("DOMContentLoaded", () => {
  renderSchema();
  renderExamples();
  const sqlIn = document.getElementById("sql-in");
  sqlIn.addEventListener("input", update);
  document.getElementById("copy-btn").addEventListener("click", copyPy);

  sqlIn.value = EXAMPLES[1].sql; // start with JOIN example
  update();
});

function renderSchema() {
  const el = document.getElementById("schema");
  let html = "";
  for (const [table, def] of Object.entries(SAMPLE_DATA)) {
    html += `<h4>${table}</h4><ul>` + def.columns.map((c) => `<li>${c}</li>`).join("") + "</ul>";
  }
  el.innerHTML = html;
}

function renderExamples() {
  const bar = document.getElementById("example-bar");
  EXAMPLES.forEach((ex) => {
    const b = document.createElement("button");
    b.textContent = ex.label;
    b.onclick = () => {
      document.getElementById("sql-in").value = ex.sql;
      update();
    };
    bar.appendChild(b);
  });
}

function update() {
  const out = document.getElementById("py-out");
  const code = convertSqlToPySpark(document.getElementById("sql-in").value);
  out.textContent = code ||
    "(Conversion isn't available for this query yet — subqueries and CTEs aren't supported.)";
}

function copyPy() {
  const text = document.getElementById("py-out").textContent;
  const btn = document.getElementById("copy-btn");
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy PySpark"), 1200);
  }).catch(() => {
    btn.textContent = "Copy failed";
    setTimeout(() => (btn.textContent = "Copy PySpark"), 1200);
  });
}
