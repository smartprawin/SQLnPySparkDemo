# Install Jupyter & PySpark

Follow these steps once to set up your local environment.

## Prerequisites

- **Python 3.8+** — [download](https://www.python.org/downloads/)
- **Java 8+ (JDK)** — PySpark needs a JVM. Install a JDK and set `JAVA_HOME`.

Check versions:

```
python --version
java -version
```

## Create virtual environment (recommended)

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate
```

## Install dependencies

```bash
pip install -r requirements.txt
```

This installs **pyspark** and **jupyterlab**.

## Launch Jupyter

```bash
jupyter lab
```

This opens `http://localhost:8888` in your browser. Navigate to `notebooks/pyspark/` and open any lesson notebook.

## Verify PySpark works

In a notebook cell:

```python
from pyspark.sql import SparkSession
spark = SparkSession.builder.master("local[*]").appName("test").getOrCreate()
df = spark.createDataFrame([(1, "alice"), (2, "bob")], ["id", "name"])
df.show()
spark.stop()
```

## Troubleshooting

- **"java not found"** — install a JDK and set `JAVA_HOME`, then restart terminal.
- **"pyspark: command not found"** — ensure your venv is activated and `pip install` completed.
- **Notebook downloads instead of opening** — open it via `jupyter lab`, not directly from GitHub.

For the full guide see [install.html](../../install.html).
