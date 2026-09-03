let SQL = null;
let sqlDb = null;

async function initSql() {
  if (sqlDb) return;
  SQL = await initSqlJs({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/${file}`
  });
  sqlDb = new SQL.Database();
  loadSampleData();
}

function loadSampleData() {
  for (const [table, def] of Object.entries(SAMPLE_DATA)) {
    const cols = def.columns.map((c) => `"${c}"`).join(", ");
    sqlDb.run(`CREATE TABLE ${table} (${cols});`);
    const placeholders = def.columns.map(() => "?").join(", ");
    const stmt = sqlDb.prepare(`INSERT INTO ${table} VALUES (${placeholders})`);
    for (const row of def.rows) stmt.run(row);
    stmt.free();
  }
}

function runUserSql(query) {
  const results = sqlDb.exec(query);
  if (!results.length) return { info: "Statement executed. No rows returned." };
  const { columns, values } = results[0];
  return { columns, values };
}
