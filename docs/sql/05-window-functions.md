# SQL Concept 5 — Window Functions

## Concept
A window function computes a value across a **set of rows related to the current row** (a "window"), without collapsing rows like `GROUP BY` does. The output keeps every row.

## Mental model
`GROUP BY` shrinks rows into one per group. A window function keeps all rows but lets each row "look at" its neighbors/siblings and compute a running total, rank, or average.

## Anatomy
```sql
<function>() OVER (
    PARTITION BY col1          -- group boundaries (like GROUP BY, but no collapse)
    ORDER BY col2              -- order within the partition
    ROWS BETWEEN ... AND ...   -- optional frame
)
```

## SQL example
```sql
SELECT
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS running_total,
    RANK() OVER (
        PARTITION BY customer_id
        ORDER BY amount DESC
    ) AS spend_rank
FROM orders;
```

## Common functions
- Ranking: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`.
- Aggregates over window: `SUM`, `AVG`, `MIN`, `MAX`.
- Offset: `LAG(col, n)`, `LEAD(col, n)` — previous/next row's value.

## PySpark equivalent
```python
from pyspark.sql import functions as F
from pyspark.sql.window import Window

w = Window.partitionBy("customer_id").orderBy("order_date")

result = (orders
          .withColumn("running_total",
                      F.sum("amount").over(w))
          .withColumn("spend_rank",
                      F.rank().over(
                          Window.partitionBy("customer_id")
                                .orderBy(F.col("amount").desc()))))
```
`LAG`/`LEAD`:
```python
Window.partitionBy("customer_id").orderBy("order_date")
F.lag("amount", 1).over(w)  # previous order's amount
```

## Common mistakes
- Forgetting `PARTITION BY` → the "window" is the whole table.
- Confusing `ROW_NUMBER` (unique) with `RANK` (ties share rank).
- Window functions can only appear in `SELECT` (and `ORDER BY`), not `WHERE`.

## Interactive exercise (website)
Add a `prev_amount` column showing each customer's previous order amount. Convert to PySpark using `lag`.
