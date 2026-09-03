# SQL Concept 3 — Aggregation & GROUP BY

## Concept
Aggregation collapses many rows into summary values (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`). `GROUP BY` defines how rows are bucketed before aggregating.

## Mental model
`GROUP BY` sorts rows into piles by the grouping column(s). Each pile becomes one output row by applying the aggregate function.

## SQL example
```sql
SELECT country, COUNT(*) AS users, AVG(age) AS avg_age
FROM users
GROUP BY country
HAVING COUNT(*) > 10;
```
- `GROUP BY country` → one pile per country.
- `HAVING` filters **after** aggregation (unlike `WHERE`, which filters before).

## WHERE vs HAVING
```sql
-- WHERE: filter raw rows first (faster)
SELECT country, COUNT(*)
FROM users
WHERE active = 1
GROUP BY country;

-- HAVING: filter the aggregated result
SELECT country, COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 10;
```

## PySpark equivalent
```python
from pyspark.sql import functions as F

result = (users
          .groupBy("country")
          .agg(F.count("*").alias("users"),
               F.avg("age").alias("avg_age"))
          .where(F.count("*") > 10))
```
In PySpark, `where` after `agg` serves the role of `HAVING`.

## Common mistakes
- Selecting a non-aggregated, non-grouped column → error (must appear in `GROUP BY`).
- Using `WHERE` on an aggregate → must use `HAVING` (or filter after `agg` in PySpark).
- `COUNT(column)` ignores NULLs; `COUNT(*)` counts all rows.

## Interactive exercise (website)
From `orders`, compute total `amount` and order count per `customer_id`, keeping only customers with > 5 orders. Convert to PySpark.
