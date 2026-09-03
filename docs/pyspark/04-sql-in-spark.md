# PySpark Concept 4 — Running SQL inside Spark

## Concept
PySpark can execute **real SQL** by registering DataFrames as temporary views and calling `spark.sql(...)`. Under the hood it uses the same DataFrame engine and Catalyst optimizer.

## Mental model
A temp view is a named, queryable table that lives only for the Spark session. Write SQL against it exactly as you would in a database.

## Registering views
```python
orders.createOrReplaceTempView("orders")
customers.createOrReplaceTempView("customers")

# Session-scoped. For cross-session, use createGlobalTempView.
```

## Running SQL
```python
result = spark.sql("""
    SELECT c.name, SUM(o.amount) AS total
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY c.name
    ORDER BY total DESC
""")
result.show()
```
`spark.sql(...)` returns a DataFrame, so you can chain DataFrame API after it:
```python
spark.sql("SELECT * FROM orders").filter(F.col("amount") > 100)
```

## Global temp views
```python
orders.createGlobalTempView("orders_global")
spark.sql("SELECT * FROM global_temp.orders_global")
```

## Why use SQL in Spark?
- Familiar to analysts; easy to port existing queries.
- Great for ad-hoc exploration and for teaching SQL → PySpark side by side.
- Same performance as DataFrame API (Catalyst optimizes both).

## Common mistakes
- View not registered before `spark.sql` → `Table or view not found`.
- Temp views are per-session; global views need the `global_temp.` prefix.
- Mixing DataFrame and SQL without realizing they share the same execution engine.

## Interactive exercise (website)
Register `users` as a temp view, then write SQL to count users per country. Do the same with the DataFrame API and compare plans via `explain()`.

## ▶ Run this locally (Jupyter)
First-time setup? See [How to install notebooks](../install.html).
Open `notebooks/pyspark/04-sql-in-spark.ipynb` in JupyterLab / VS Code and run the cells:
```bash
pip install -r requirements.txt
jupyter lab notebooks/pyspark/04-sql-in-spark.ipynb
```

Expected sample output (also shown in the notebook):
```
+-------+-----+
|country|count|
+-------+-----+
|     US|    3|
|     CA|    2|
+-------+-----+
```
