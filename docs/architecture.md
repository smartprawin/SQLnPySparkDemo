# Interactive Website — Architecture & Plan

This is the **plan** for the learning website. It is written during the documentation phase; implementation starts after concepts are agreed.

## Goal
An interactive, browser-based course where learners read a concept, see a live example, and **run/edit/answer** exercises for both SQL and PySpark — concept by concept.

## Audience & flow
- Each lesson = one concept (matches the `docs/` files).
- Flow per lesson: **Explain → Show example → Try it (interactive) → Check answer → Next**.

## High-level architecture

```
Browser (SPA)
 ├─ Lesson viewer (renders docs/*.md)
 ├─ SQL runner      ──► SQLite WASM (runs in browser, zero setup)
 └─ PySpark runner  ──► Backend API (optional) OR teaching sandbox
        │
        └──► (future) API: POST query → Spark/executor → results JSON
```

## Component decisions

### 1. Frontend
- **Option A (recommended for simplicity):** Plain HTML + JavaScript with a lightweight Markdown renderer. Fast to build, easy to host (static).
- **Option B:** React + Vite SPA for richer interactivity (code editors, live feedback, progress tracking).
- A code editor widget (e.g. CodeMirror or Monaco) for typing queries.

### 2. SQL execution (browser-native)
- Use **SQLite compiled to WebAssembly** (`sql.js` / SQLite WASM).
- Ship small sample datasets (users, orders, customers) as `.csv`/`.sql` loaded into the in-browser DB.
- Learners run real SQL instantly; no server needed.

### 3. PySpark execution — local notebooks (no backend, no Colab)
Spark cannot run in the browser, and GitHub Pages can't host a server. Instead learners run PySpark **locally** in a notebook:

- Each PySpark concept ships as a notebook: `notebooks/pyspark/NN-*.ipynb` (standard Jupyter/IPython format, also openable in VS Code or Marimo).
- The site links **"▶ Run locally"** to the notebook file in the repo. To execute:
  ```bash
  git clone <repo>
  pip install -r requirements.txt   # pyspark, jupyterlab
  jupyter lab notebooks/pyspark/01-rdd-dataframe.ipynb
  ```
  (Optionally provide a `docker-compose` / `setup.sh` that launches Jupyter with `PYSPARK_PYTHON` preconfigured.)
- Notebooks run PySpark in **local mode** — real Spark, no cluster.
- Each doc also shows the **expected sample output** so the lesson reads complete even before running.

Local notebook runners to choose from:
- **JupyterLab / Jupyter Notebook** (classic, most familiar).
- **VS Code** (built-in Jupyter support, no extra server).
- **Marimo** (reactive notebooks, can also be served as web apps).

Pros: zero hosting cost, real PySpark, fully offline, privacy-friendly. Cons: learner must install Python + PySpark locally (we provide `requirements.txt` + setup steps).

### 4. Content model (separates content from code)
```
lessons/
  sql/01-select-where.md        (+ datasets/*.csv)
  sql/02-joins.md
  ...
  pyspark/01-rdd-dataframe.md
exercises/
  sql/01.json        # question, starter query, expected result / checks
  pyspark/01.json
```
Lessons reference datasets by name; the runner loads them.

### 5. Progress & feedback
- Track completed lessons in `localStorage`.
- Exercise checker: compare result set (SQL) or assert conditions (PySpark) and show pass/fail with hints.

## Build phases (proposed)
1. **Phase 0 (done):** Concept docs (`docs/`).
2. **Phase 1:** Static site scaffold + Markdown lesson viewer + sample datasets.
3. **Phase 2:** In-browser SQL runner (SQLite WASM) with exercises.
4. **Phase 3:** PySpark notebooks (`notebooks/pyspark/*.ipynb`) + "Run locally" links + `requirements.txt`/`setup`; embed expected sample output in docs.
5. **Phase 4:** Progress tracking, navigation, polish.

## Decisions (resolved)
- Frontend: plain HTML/JS (static, interactive via CodeMirror + SQLite WASM).
- SQL track: runs live in-browser (SQLite WASM).
- PySpark track: **local Jupyter notebooks** (`notebooks/pyspark/*.ipynb`, runnable in JupyterLab / VS Code / Marimo); linked from the site with setup steps; expected output embedded in docs. No backend/server/Colab needed.
- Hosting: GitHub Pages (static).

## Next step
Once the user confirms tech choices above, scaffold the project in `src/` (or `website/`) and implement Phase 1.
