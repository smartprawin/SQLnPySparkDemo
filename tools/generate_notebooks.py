"""Generate the PySpark lesson notebooks (local-mode) used by the website.

Run:  python tools/generate_notebooks.py
Output: notebooks/pyspark/NN-*.ipynb
"""
import json
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "notebooks", "pyspark")


def md(text):
    return {"cell_type": "markdown", "metadata": {}, "source": text.splitlines(keepends=True)}


def code(text):
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": text.splitlines(keepends=True),
    }


NOTEBOOKS = {
    "01-rdd-dataframe": [
        md("# PySpark 1: RDD vs DataFrame\n\nRuns locally with PySpark in local mode. Install first if needed."),
        code("!pip install pyspark\n"),
        code(
            'from pyspark.sql import SparkSession\n'
            'spark = SparkSession.builder.master("local[*]").appName("rdd-vs-df").getOrCreate()\n'
            'sc = spark.sparkContext\n\n'
            '# RDD example\n'
            'rdd = sc.parallelize([1, 2, 3, 4])\n'
            'squared = rdd.map(lambda x: x * x)\n'
            'print(squared.collect())  # [1, 4, 9, 16]\n\n'
            '# DataFrame example\n'
            'df = spark.createDataFrame(\n'
            '    [(1, "alice", 30), (2, "bob", 25)],\n'
            '    ["id", "name", "age"])\n'
            'df.show()\n'
        ),
        code("spark.stop()\n"),
    ],
    "02-transformations-actions": [
        md("# PySpark 2: Transformations vs Actions (Lazy Evaluation)"),
        code(
            'from pyspark.sql import SparkSession, functions as F\n'
            'spark = SparkSession.builder.master("local[*]").appName("t-vs-a").getOrCreate()\n\n'
            'users = spark.createDataFrame(\n'
            '    [(1, "alice", 30, "US"),\n'
            '     (2, "bob", 17, "CA"),\n'
            '     (3, "carol", 25, "US")],\n'
            '    ["id", "name", "age", "country"])\n\n'
            'df2 = users.filter(F.col("age") > 18)   # transformation\n'
            'df3 = df2.select("name")                # transformation\n\n'
            'df3.explain()   # shows the optimized (lazy) plan; no data scanned yet\n'
            'df3.show()      # action -> triggers execution\n'
        ),
        code("spark.stop()\n"),
    ],
    "03-dataframe-api": [
        md("# PySpark 3: DataFrame API"),
        code(
            'from pyspark.sql import SparkSession, functions as F\n'
            'spark = SparkSession.builder.master("local[*]").getOrCreate()\n\n'
            'users = spark.createDataFrame(\n'
            '    [(1, "alice", 30), (2, "bob", 17), (3, "carol", 25)],\n'
            '    ["id", "name", "age"])\n\n'
            'result = (users\n'
            '    .withColumn("age_group", F.when(F.col("age") >= 18, "adult").otherwise("minor"))\n'
            '    .select("name", "age_group")\n'
            '    .orderBy("name"))\n'
            'result.show()\n'
        ),
        code("spark.stop()\n"),
    ],
    "04-sql-in-spark": [
        md("# PySpark 4: Running SQL inside Spark"),
        code(
            'from pyspark.sql import SparkSession\n'
            'spark = SparkSession.builder.master("local[*]").getOrCreate()\n\n'
            'orders = spark.createDataFrame(\n'
            '    [(1, 1, 100.0), (2, 2, 200.0), (3, 1, 50.0), (4, 3, 75.0)],\n'
            '    ["order_id", "customer_id", "amount"])\n'
            'customers = spark.createDataFrame(\n'
            '    [(1, "alice", "US"), (2, "bob", "CA"), (3, "carol", "US")],\n'
            '    ["customer_id", "name", "country"])\n\n'
            'orders.createOrReplaceTempView("orders")\n'
            'customers.createOrReplaceTempView("customers")\n\n'
            'sql_text = (\n'
            '    "SELECT c.name, SUM(o.amount) AS total "\n'
            '    "FROM orders o "\n'
            '    "JOIN customers c ON o.customer_id = c.customer_id "\n'
            '    "GROUP BY c.name "\n'
            '    "ORDER BY total DESC"\n'
            ')\n'
            'spark.sql(sql_text).show()\n'
        ),
        code("spark.stop()\n"),
    ],
    "05-window-functions": [
        md("# PySpark 5: Window Functions in PySpark"),
        code(
            'from pyspark.sql import SparkSession, functions as F\n'
            'from pyspark.sql.window import Window\n'
            'spark = SparkSession.builder.master("local[*]").getOrCreate()\n\n'
            'orders = spark.createDataFrame(\n'
            '    [(1, "2024-01-01", 100.0),\n'
            '     (1, "2024-01-05", 50.0),\n'
            '     (1, "2024-02-01", 120.0),\n'
            '     (2, "2024-01-02", 200.0)],\n'
            '    ["customer_id", "order_date", "amount"])\n\n'
            'w = Window.partitionBy("customer_id").orderBy("order_date")\n\n'
            '(orders\n'
            '    .withColumn("running_total", F.sum("amount").over(w))\n'
            '    .withColumn("prev_amount", F.lag("amount", 1).over(w))\n'
            '    .show())\n'
        ),
        code("spark.stop()\n"),
    ],
}


def build_nb(cells):
    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3",
            },
            "language_info": {"name": "python", "version": "3"},
        },
        "nbformat": 4,
        "nbformat_minor": 5,
    }


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, cells in NOTEBOOKS.items():
        path = os.path.join(OUT_DIR, f"{name}.ipynb")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(build_nb(cells), f, indent=1)
        print("wrote", os.path.relpath(path))
    print(f"\nDone: {len(NOTEBOOKS)} notebooks in {os.path.relpath(OUT_DIR)}")


if __name__ == "__main__":
    main()
