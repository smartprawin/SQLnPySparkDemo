# PySpark Concept 3 — DataFrame API

## Concept
The DataFrame API is Spark's structured, SQL-like programming interface. Most data work is done here: selecting, filtering, grouping, joining, and adding columns.

## Core operations
```python
from pyspark.sql import functions as F

# Select / project
df.select("name", "age")

# Filter rows
df.filter(F.col("age") >= 18)
df.where(F.col("country") == "US")

# Add / transform a column
df.withColumn("age_plus_1", F.col("age") + 1)
df.withColumn("name_upper", F.upper(F.col("name")))

# Rename / drop
df.withColumnRenamed("age", "years")
df.drop("tmp")

# Group + aggregate
df.groupBy("country").agg(
    F.count("*").alias("n"),
    F.avg("age").alias("avg_age"))

# Sort
df.orderBy(F.col("age").desc())

# Distinct
df.select("country").distinct()
```

## Column expressions
Use `pyspark.sql.functions` (`F`) for expressions:
- Math: `F.col("a") + F.col("b")`, `F.lit(1)`
- String: `F.upper`, `F.concat`, `F.substring`
- Conditional: `F.when(F.col("age")>18, "adult").otherwise("minor")`
- Null handling: `F.coalesce(col1, col2)`, `F.isnull`

## PySpark vs SQL mapping
| SQL | PySpark |
|-----|---------|
| `SELECT a, b` | `.select("a","b")` |
| `WHERE x > 1` | `.filter(F.col("x") > 1)` |
| `GROUP BY c` | `.groupBy("c")` |
| `ORDER BY x DESC` | `.orderBy(F.col("x").desc())` |
| `CASE WHEN` | `F.when(...).otherwise(...)` |

## Common mistakes
- Using Python `and`/`or` instead of `&`/`|` in column conditions.
- Forgetting parentheses around each `&`/`|` condition.
- Reassigning `df = df.withColumn(...)` — `withColumn` returns a new DataFrame; the old one is unchanged unless reassigned.

## Interactive exercise (website)
From `users`, create a column `age_group` (`'adult'` if age>=18 else `'minor'`), keep `name` and `age_group`, sorted by name. Convert any equivalent SQL.

## ▶ Run this locally (Jupyter)
First-time setup? See [How to install notebooks](../install.html).
Open `notebooks/pyspark/03-dataframe-api.ipynb` in JupyterLab / VS Code and run the cells:
```bash
pip install -r requirements.txt
jupyter lab notebooks/pyspark/03-dataframe-api.ipynb
```

Expected sample output (also shown in the notebook):
```
+-----+---------+
| name|age_group|
+-----+---------+
| alice|    adult|
|   bob|    minor|
+-----+---------+
```
