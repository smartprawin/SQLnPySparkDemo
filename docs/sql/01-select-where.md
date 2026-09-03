# SQL Concept 1 — SELECT & WHERE

## Concept
`SELECT` chooses **which columns** to return. `WHERE` chooses **which rows** to keep. Together they are ~80% of everyday SQL.

## Mental model
Imagine a spreadsheet. `SELECT` hides columns you don't want; `WHERE` hides rows that fail a test. The result is a smaller rectangle of data.

## SQL example
```sql
SELECT name, age
FROM users
WHERE age >= 18
  AND country = 'US';
```
- `name, age` → columns kept.
- `age >= 18 AND country = 'US'` → rows kept.

## Key clauses
- `SELECT col1, col2` — project columns.
- `SELECT *` — all columns (avoid in production).
- `WHERE <condition>` — row filter, evaluated **before** aggregation.
- Comparison ops: `=, <>, >, <, >=, <=`.
- Logic: `AND, OR, NOT`.
- `LIKE 'A%'` for patterns, `IN (...) ` for lists, `IS NULL` for missing.

## PySpark equivalent
```python
from pyspark.sql import functions as F

result = (users
          .select("name", "age")
          .where((F.col("age") >= 18) & (F.col("country") == "US")))
```
Note: use `&` / `|` (not `and`/`or`) and wrap each condition in parentheses. `where` and `filter` are synonyms.

## Common mistakes
- Using `WHERE` to filter on an aggregate (e.g. `WHERE SUM(amount) > 100`) — that needs `HAVING` (see aggregation doc).
- `NULL = 'US'` is never true; use `IS NULL` / `IS NOT NULL`.
- Forgetting parentheses around `&`/`|` in PySpark → operator precedence bugs.

## Interactive exercise (website)
Given a `users` table, write a query returning `name` for users aged 21+ in `'CA'`. Then flip it to PySpark.
