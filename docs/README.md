# Learn SQL & PySpark — Interactive Course

A concept-by-concept, hands-on learning path for **SQL** and **PySpark**, delivered through an interactive website. This folder (`docs/`) is the **theory + plan** phase. The website itself is built later (see `docs/architecture.md`).

## Why learn them together?

SQL is the lingua franca of data. PySpark is how you process data that is too big for one machine. PySpark's **DataFrame API** is deliberately modeled on SQL, and PySpark can also run **SQL directly**. Learning them side by side makes both click faster.

## The learning model

Each concept has the same shape:

1. **Concept** — what it is and why it exists.
2. **Mental model** — the simplest way to picture it.
3. **SQL example** — the classic relational form.
4. **PySpark equivalent** — the same idea in code.
5. **Common mistakes** — what trips people up.
6. **Interactive exercise** (for the website) — run / predict / fix.

## Roadmap

### SQL track
| # | Concept | Doc |
|---|---------|-----|
| 1 | SELECT & WHERE (filtering rows) | `sql/01-select-where.md` |
| 2 | JOINs (combining tables) | `sql/02-joins.md` |
| 3 | Aggregation & GROUP BY | `sql/03-aggregation.md` |
| 4 | Subqueries & CTEs | `sql/04-subqueries-cte.md` |
| 5 | Window functions | `sql/05-window-functions.md` |

### PySpark track
| # | Concept | Doc |
|---|---------|-----|
| 1 | RDD vs DataFrame | `pyspark/01-rdd-dataframe.md` |
| 2 | Transformations vs Actions (lazy evaluation) | `pyspark/02-transformations-actions.md` |
| 3 | DataFrame API | `pyspark/03-dataframe-api.md` |
| 4 | Running SQL inside Spark | `pyspark/04-sql-in-spark.md` |
| 5 | Window functions in PySpark | `pyspark/05-window-functions.md` |

## How to use this course

- Read one doc at a time, in order.
- For every SQL snippet, try to predict the PySpark equivalent before reading it.
- The website will let you **run** these snippets and get instant feedback.

## Tech direction (detailed in `architecture.md`)

- Frontend: a lightweight SPA (e.g. React/Vite or plain HTML+JS) with a lesson viewer.
- SQL execution: in-browser SQLite (sql.js / SQLite WASM) so learners run real SQL with zero setup.
- PySpark execution: executed server-side (Spark doesn't run in the browser) via a small API, OR demonstrated with a PySpark-to-pandas teaching sandbox.
- Lessons are data files (`lessons/*.md` + sample datasets) so content stays separate from code.
