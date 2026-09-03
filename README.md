# SQL & PySpark — Interactive Learning Site

A static, concept-by-concept course. SQL runs **live in your browser** (SQLite WASM); PySpark runs in a **local Jupyter notebook** you download and execute.

## Project layout
```
docs/                     # Concept documentation (the content source)
  sql/01..05.md           # SQL lessons
  pyspark/01..05.md       # PySpark lessons
  architecture.md         # Site plan / decisions
index.html                # The website (lessons + live SQL runner)
editor.html               # Standalone SQL -> PySpark live converter page
css/style.css             # Styles
js/data.js                # Sample datasets (users, customers, orders)
js/sql-runner.js          # In-browser SQLite (sql.js) engine
js/sql-to-pyspark.js      # SQL -> PySpark (DataFrame API) translator
js/app.js                 # Lesson loader + UI logic
js/editor.js              # Converter page logic
notebooks/pyspark/*.ipynb # Local PySpark notebooks (one per concept)
requirements.txt          # pyspark, jupyterlab
tools/generate_notebooks.py  # Regenerates the notebooks
```

## Run the website (locally)
The site loads lessons via `fetch`, so it must be served over HTTP (not opened as a `file://`).

```bash
# from the project root
python -m http.server 8000
# then open http://localhost:8000
```
On the SQL lessons, edit the query and press **Run SQL** — it executes against the sample tables (`users`, `customers`, `orders`) in your browser. No setup required.

## Run a PySpark lesson (locally)
1. Download the notebook from the lesson's "⬇ Download / open notebook" button.
2. Install deps:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch Jupyter and open the notebook:
   ```bash
   jupyter lab notebooks/pyspark/01-rdd-dataframe.ipynb
   ```
4. Run the cells to see real PySpark output (local mode, no cluster).

To regenerate the notebooks after editing the generator:
```bash
python tools/generate_notebooks.py
```

## Deploy
The site is fully static — push to GitHub and enable **GitHub Pages** (root). PySpark notebooks are opened locally, so no server/backend is needed.

## Concepts covered
- **SQL:** SELECT & WHERE, JOINs, Aggregation/GROUP BY, Subqueries & CTEs, Window Functions.
- **PySpark:** RDD vs DataFrame, Transformations vs Actions, DataFrame API, SQL in Spark, Window Functions.
