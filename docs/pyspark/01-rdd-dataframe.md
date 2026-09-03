# PySpark Concept 1 — RDD vs DataFrame

## Concept
**RDD** (Resilient Distributed Dataset) is Spark's low-level, untyped distributed collection. **DataFrame** is a distributed table with a schema (named, typed columns) — like a Spark-native SQL table.

## Mental model
- RDD = a giant list split across machines; you write functions to transform it.
- DataFrame = a spreadsheet split across machines; Spark knows the column names/types and optimizes for you.

## RDD example
```python
rdd = sc.parallelize([1, 2, 3, 4])
squared = rdd.map(lambda x: x * x)
print(squared.collect())  # [1, 4, 9, 16]
```

## DataFrame example
```python
from pyspark.sql import functions as F

df = spark.createDataFrame(
    [(1, "alice", 30), (2, "bob", 25)],
    ["id", "name", "age"])
df.show()
df.select(F.col("name")).show()
```

## When to use which
| | RDD | DataFrame |
|---|-----|-----------|
| Schema | none (just objects) | yes |
| Optimization | manual | Catalyst optimizer (fast) |
| API style | functional (`map`/`filter`) | relational (`select`/`groupBy`) |
| Use case | custom/complex logic | almost everything else |

**Rule of thumb:** use DataFrame unless you have highly custom, row-by-row logic RDDs handle better.

## Common mistakes
- Using RDDs for things DataFrames do faster and cleaner.
- Treating a DataFrame like a Pandas DataFrame (`df[0]` won't work) — use Spark transformations.

## Interactive exercise (website)
Create a DataFrame of 3 people and show only those with age > 28. Then do the same with an RDD `filter`.

## ▶ Run this locally (Jupyter)
First-time setup? See [How to install notebooks](../install.html).
Open `notebooks/pyspark/01-rdd-dataframe.ipynb` in JupyterLab / VS Code and run the cells to see real PySpark output:
```bash
pip install -r requirements.txt
jupyter lab notebooks/pyspark/01-rdd-dataframe.ipynb
```

Expected sample output (also shown in the notebook):
```
+---+-----+---+
| id| name|age|
+---+-----+---+
|  1|alice| 30|
+---+-----+---+
```
