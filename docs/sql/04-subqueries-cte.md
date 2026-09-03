# SQL Concept 4 — Subqueries & CTEs

## Concept
A **subquery** is a query nested inside another. A **CTE** (Common Table Expression, `WITH ...`) is a named, reusable subquery — much more readable.

## Mental model
Break a hard question into steps. Each step is a temporary "table" you can reference by name, like variables in code.

## SQL example (subquery)
```sql
SELECT name
FROM users
WHERE age > (SELECT AVG(age) FROM users);
```

## SQL example (CTE) — preferred
```sql
WITH high_value AS (
    SELECT customer_id, SUM(amount) AS total
    FROM orders
    GROUP BY customer_id
)
SELECT c.name, h.total
FROM high_value h
JOIN customers c ON h.customer_id = c.customer_id
WHERE h.total > 1000;
```

## Why CTEs over subqueries
- Read top-to-bottom like a story.
- Can be referenced multiple times.
- Easier to debug step by step.

## PySpark equivalent
PySpark has no literal "subquery" syntax, but you compose with `.alias()` and register temp views, or just chain DataFrames:
```python
from pyspark.sql import functions as F

high_value = (orders
              .groupBy("customer_id")
              .agg(F.sum("amount").alias("total"))
              .where(F.col("total") > 1000))

result = (high_value
          .join(customers, "customer_id")
          .select("name", "total"))

# Or use SQL with a CTE after registering a temp view:
orders.createOrReplaceTempView("orders")
customers.createOrReplaceTempView("customers")
spark.sql("""
WITH high_value AS (
    SELECT customer_id, SUM(amount) AS total
    FROM orders GROUP BY customer_id
)
SELECT c.name, h.total
FROM high_value h JOIN customers c ON h.customer_id = c.customer_id
WHERE h.total > 1000
""")
```

## Common mistakes
- Correlated subqueries (subquery referencing outer column) can be slow — prefer JOINs/CTEs.
- Forgetting the alias/name when referencing a CTE.
- Mixing up `WHERE` (row filter) and `HAVING` (aggregate filter) inside the CTE.

## Interactive exercise (website)
Find customers whose total spend is above the average customer spend, using a CTE. Then solve with PySpark DataFrame API.
