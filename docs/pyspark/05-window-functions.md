# PySpark Concept 5 — Window Functions in PySpark

## Concept
PySpark window functions mirror SQL window functions: compute values across a row's "window" of related rows while keeping every row. Defined via `pyspark.sql.window.Window`.

## Mental model
Same as SQL Concept 5: rows stay, but each gets a computed value from its partition/order context (running total, rank, lag, etc.).

## Defining a window
```python
from pyspark.sql import functions as F
from pyspark.sql.window import Window

w = (Window
     .partitionBy("customer_id")
     .orderBy("order_date"))
```

## Examples
```python
# Running total per customer over time
df.withColumn("running_total", F.sum("amount").over(w))

# Rank by spend within each customer
w_rank = Window.partitionBy("customer_id").orderBy(F.col("amount").desc())
df.withColumn("spend_rank", F.rank().over(w_rank))

# Previous order's amount (LAG)
df.withColumn("prev_amount", F.lag("amount", 1).over(w))

# Next order's amount (LEAD)
df.withColumn("next_amount", F.lead("amount", 1).over(w))

# Row number
df.withColumn("rn", F.row_number().over(w))
```

## Window frame (advanced)
```python
from pyspark.sql.window import Window
w_frame = (Window.partitionBy("customer_id")
           .orderBy("order_date")
           .rowsBetween(Window.currentRow - 2, Window.currentRow))
# sum of current + previous 2 rows
df.withColumn("rolling_3", F.sum("amount").over(w_frame))
```

## SQL vs PySpark
```sql
SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date)
```
```python
F.sum("amount").over(Window.partitionBy("customer_id").orderBy("order_date"))
```

## Common mistakes
- Omitting `partitionBy` → window is the entire dataset.
- `rank()` gives gaps on ties; use `dense_rank()` if you want no gaps.
- Window functions can't be used in `where`/`filter` directly — compute the column first, then filter the result.

## Interactive exercise (website)
For `orders`, add `prev_amount` (lag) and `running_total` per customer ordered by date. Then express the same in Spark SQL.

## ▶ Run this locally (Jupyter)
First-time setup? See [How to install notebooks](../install.html).
Open `notebooks/pyspark/05-window-functions.ipynb` in JupyterLab / VS Code and run the cells:
```bash
pip install -r requirements.txt
jupyter lab notebooks/pyspark/05-window-functions.ipynb
```

Expected sample output (also shown in the notebook):
```
+customer_id+----------+------+-----------+-------------+
|customer_id|order_date|amount|prev_amount|running_total|
+-----------+----------+------+-----------+-------------+
|          1|2024-01-01|   100|       NULL|          100|
|          1|2024-01-05|    50|        100|          150|
+-----------+----------+------+-----------+-------------+
```
