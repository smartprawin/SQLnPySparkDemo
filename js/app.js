const LESSONS = [
  { id: "setup/install-jupyter", title: "⚙ Install Jupyter & PySpark", type: "setup" },
  { id: "sql/01-select-where", title: "SQL 1 · SELECT & WHERE", type: "sql" },
  { id: "sql/02-joins", title: "SQL 2 · JOINs", type: "sql" },
  { id: "sql/03-aggregation", title: "SQL 3 · Aggregation", type: "sql" },
  { id: "sql/04-subqueries-cte", title: "SQL 4 · Subqueries & CTEs", type: "sql" },
  { id: "sql/05-window-functions", title: "SQL 5 · Window Functions", type: "sql" },
  { id: "pyspark/01-rdd-dataframe", title: "PySpark 1 · RDD vs DataFrame", type: "pyspark" },
  { id: "pyspark/02-transformations-actions", title: "PySpark 2 · Transformations & Actions", type: "pyspark" },
  { id: "pyspark/03-dataframe-api", title: "PySpark 3 · DataFrame API", type: "pyspark" },
  { id: "pyspark/04-sql-in-spark", title: "PySpark 4 · SQL in Spark", type: "pyspark" },
  { id: "pyspark/05-window-functions", title: "PySpark 5 · Window Functions", type: "pyspark" }
];

const mdCache = {};
let lastMarkdown = "";

window.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  const sqlInput = document.getElementById("sql-input");
  if (sqlInput) sqlInput.addEventListener("input", updatePySpark);
  initSql().catch((err) => console.error("SQL init failed:", err));
  if (LESSONS.length) selectLesson(LESSONS[0]);
});

function renderSidebar() {
  const nav = document.getElementById("lesson-list");
  LESSONS.forEach((lesson) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = lesson.title;
    a.onclick = (e) => { e.preventDefault(); selectLesson(lesson); };
    li.appendChild(a);
    nav.appendChild(li);
  });
}

function renderMd(md) {
  if (window.marked) return (marked.parse ? marked.parse(md) : marked(md));
  return `<pre>${escapeHtml(md)}</pre>`;
}

async function selectLesson(lesson) {
  document.querySelectorAll("#lesson-list a").forEach((a) => {
    a.classList.toggle("active", a.textContent === lesson.title);
  });

  const content = document.getElementById("lesson-content");
  const sqlPanel = document.getElementById("sql-panel");
  const pyPanel = document.getElementById("pyspark-panel");

  if (lesson.type === "sql") {
    sqlPanel.style.display = "block";
    pyPanel.style.display = "none";
  } else if (lesson.type === "setup") {
    sqlPanel.style.display = "none";
    pyPanel.style.display = "none";
  } else {
    sqlPanel.style.display = "none";
    pyPanel.style.display = "block";
    document.getElementById("notebook-link").href = `notebooks/${lesson.id}.ipynb`;
  }

  if (!mdCache[lesson.id]) {
    const res = await fetch(`docs/${lesson.id}.md`);
    mdCache[lesson.id] = await res.text();
  }
  lastMarkdown = mdCache[lesson.id];
  content.innerHTML = renderMd(lastMarkdown);

  if (lesson.type === "sql") resetSql();
}

function firstSqlBlock(md) {
  const m = md.match(/```sql\n([\s\S]*?)```/);
  return m ? m[1].trim() : "";
}

function resetSql() {
  document.getElementById("sql-input").value = firstSqlBlock(lastMarkdown);
  document.getElementById("sql-result").innerHTML = "";
  updatePySpark();
}

function updatePySpark() {
  const out = document.getElementById("pyspark-out");
  if (!out) return;
  const sql = document.getElementById("sql-input").value;
  const code = (typeof convertSqlToPySpark === "function") ? convertSqlToPySpark(sql) : null;
  out.textContent = code ||
    "(Live PySpark conversion isn't available for this query yet — subqueries and CTEs aren't supported.)";
}

function runSql() {
  const input = document.getElementById("sql-input").value;
  const out = document.getElementById("sql-result");
  if (!sqlDb) {
    out.innerHTML = "<p class='info'>SQL engine still loading… try again in a moment.</p>";
    return;
  }
  try {
    const res = runUserSql(input);
    if (res.info) { out.innerHTML = `<p class='info'>${escapeHtml(res.info)}</p>`; return; }
    out.innerHTML = renderTable(res.columns, res.values);
  } catch (e) {
    out.innerHTML = `<p class='error'>${escapeHtml(e.message)}</p>`;
  }
}

function renderTable(columns, values) {
  let html = "<table><thead><tr>";
  html += columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
  html += "</tr></thead><tbody>";
  for (const row of values) {
    html += "<tr>" + row.map((v) =>
      `<td>${v === null ? "<em>NULL</em>" : escapeHtml(String(v))}</td>`
    ).join("") + "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
