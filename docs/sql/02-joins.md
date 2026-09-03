# SQL Concept 2 — JOINs

## Concept
A `JOIN` combines rows from **two tables** based on a matching key. It is how relational databases avoid duplicating data.

## Mental model
Take table A and table B. For each row in A, find the matching row(s) in B using the key, and glue the columns side by side.

## SQL example
```sql
SELECT o.order_id, c.name, o.amount
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id;
```

## Join types
| Join | Rows returned |
|------|---------------|
| `INNER JOIN` | only matching rows in both |
| `LEFT JOIN` | all left rows; right fills with NULL if no match |
| `RIGHT JOIN` | all right rows |
| `FULL OUTER JOIN` | all rows from both sides |
| `CROSS JOIN` | every combination (use carefully) |

## PySpark equivalent
```python
from pyspark.sql import functions as F

result = (orders
          .join(customers,
                orders["customer_id"] == customers["customer_id"],
                "inner")
          .select("order_id", "name", "amount"))
```
Join types: `"inner"`, `"left"`, `"right"`, `"full"`, `"cross"`.

## Common mistakes
- **Cartesian product**: forgetting the `ON`/join condition → rows explode.
- **Ambiguous column**: same column name in both tables. Disambiguate with table aliases (`o.customer_id`).
- **NULL keys** in a LEFT JOIN still produce a row (with NULLs) — that's expected, not a bug.

## Interactive exercise (website)
Given `orders` and `customers`, show all customers and their orders (include customers with no orders) using a LEFT JOIN. Then convert to PySpark.
