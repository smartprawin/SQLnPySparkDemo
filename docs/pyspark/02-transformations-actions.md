# PySpark Concept 2 — Transformations vs Actions (Lazy Evaluation)

## Concept
Spark is **lazy**: defining a transformation records a plan but does **no work**. Work happens only when an **action** is called. This lets Spark optimize the whole pipeline before executing.

## Mental model
Transformations are "recipes" you write down. Actions are "cook now." Spark reads all your recipes, figures out the best way to cook, then runs once.

## Transformations (lazy)
Return a new DataFrame/RDD; no computation yet.
```python
df2 = df.filter(F.col("age") > 18)   # transformation
df3 = df2.select("name")             # transformation
```

## Actions (trigger execution)
```python
df3.show()            # action -> prints
df3.collect()         # action -> returns data to driver (use carefully!)
df3.count()           # action
df3.write.parquet("out")  # action
```

## Why it matters
- Spark builds a **logical plan**, optimizes it (predicate pushdown, column pruning), then runs.
- Calling many transformations without an action does nothing — a classic "why is my code slow / not running?" confusion.
- `collect()` pulls everything to the driver; on big data it can crash. Prefer `show()`, `take(n)`, or writing to storage.

## Common mistakes
- Expecting side effects (print, counter) inside a transformation — Spark may not run it, or may run it multiple times.
- `collect()` on huge data → driver OOM.
- Reusing a transformed DataFrame without caching → Spark recomputes the plan each action. Use `.cache()` / `.persist()` if reused.

## Interactive exercise (website)
Build a filter + select pipeline on `users`, then call `explain()` to see the optimized plan before running `show()`.

## ▶ Run this locally (Jupyter)
First-time setup? See [How to install notebooks](../install.html).
Open `notebooks/pyspark/02-transformations-actions.ipynb` in JupyterLab / VS Code and run the cells:
```bash
pip install -r requirements.txt
jupyter lab notebooks/pyspark/02-transformations-actions.ipynb
```

Expected sample output (also shown in the notebook):
```
== Physical Plan ==
*(1) Filter (isnotnull(age#2L) AND (age#2L > 18))
+- *(1) Scan ...
+-----+
| name|
+-----+
|alice|
+-----+
```
