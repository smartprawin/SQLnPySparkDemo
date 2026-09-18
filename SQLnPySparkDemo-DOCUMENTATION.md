# SQLnPySparkDemo - Complete Documentation

> Auto-generated documentation of all pages, guides, scripts, theming and navigation. Frontend-only static site, no backend.

Last Updated: 2026-09-09

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Pages](#pages)
3. [Guides](#guides)
4. [Navigation Flow](#navigation-flow)
5. [Shared Scripts](#shared-scripts)
6. [Styling / Theming](#styling--theming)
7. [Storage Keys](#storage-keys)
8. [Recent Fixes](#recent-fixes)

---

## Project Overview

Static HTML/CSS/JS learning hub. Open via `file://` or `python -m http.server 8000`.
No `server.js`, no `package.json`, no SQLite DB.

```
index.html          # Hub landing - 4 tracks + Jump to Any Lesson
editor.html         # SQL -> PySpark live converter
install.html        # PySpark notebooks local setup
forensics.html      # Private Digital Forensics recap (forensics_data.json)
sql-guide/ (13)     # SQL Mastery
pyspark-guide/ (10) # PySpark Interview Guide
python-guide/ (11)  # Python for PySpark
aws-guide/ (9)      # AWS Data Engineering
js/                 # Hub legacy + converter (data.js, sql-runner.js, sql-to-pyspark.js, app.js, editor.js)
*/js/main.js        # Per-guide app (Search, Progress, Bookmarks, Theme, Sidebar, etc.)
*/css/styles.css    # Per-guide master stylesheet (~2837 lines)
css/style.css       # Hub + legacy dark glass theme (475 lines)
```

---

## Pages

### 1. index.html

| Property | Value |
|----------|-------|
| **Title** | SQL & PySpark Mastery Hub |
| **Purpose** | Hub landing. 4 `hub-card`s + `lesson-grid` deep links |

**Sections:**
- `header` links -> `editor.html`, `install.html`, `forensics.html` (`index.html:54-58`)
- `hub-hero` - Choose Your Track
- `hub-grid` - Python / SQL / PySpark / AWS cards (`index.html:66-110`)
- `lessons-section lesson-grid` - 16 direct lesson cards (`index.html:112-215`)
- Private recap link -> `forensics.html`

**Navigation:**
- Explore Python Guide -> `python-guide/index.html`
- Explore SQL Guide -> `sql-guide/index.html`
- Explore PySpark Guide -> `pyspark-guide/index.html`
- Explore AWS Guide -> `aws-guide/index.html`
- Jump links e.g. `sql-guide/joins.html#sample-tables`, `pyspark-guide/performance.html#salting`

### 2. editor.html

| Property | Value |
|----------|-------|
| **Title** | SQL → PySpark Live Converter |
| **Purpose** | Live SQL to DataFrame API translator |

**Elements:**
- `textarea#sql-in` input
- `pre#py-out` output
- `div#schema`, `div#example-bar`
- `button#copy-btn`

**Scripts:**
- `js/data.js`, `js/sql-to-pyspark.js`, `js/editor.js`

### 3. install.html

| Property | Value |
|----------|-------|
| **Title** | Install & Run PySpark Notebooks |
| **Purpose** | One-time local Jupyter setup, no server/Colab |

### 4. forensics.html

| Property | Value |
|----------|-------|
| **Title** | My Recap — Digital Forensics Notes |
| **Purpose** | Private Q&A, answers hidden like .docx |

**Elements:**
- `input#qa-search`, data from `forensics_data.json`

---

## Guides

| Guide | Files | Index Title |
|-------|-------|-------------|
| `sql-guide/` | 13: `index,fundamentals,basics,crud,functions,joins,subqueries,window,advanced,performance,modeling,interview,exercises` | SQL Mastery - SQL Mastery |
| `pyspark-guide/` | 10: `index,fundamentals,architecture,transformations,programming,partitions,joins,performance,real-world,interview` | PySpark Interview Guide |
| `python-guide/` | 11: `index,basics,datatypes,operators,controlflow,collections,functions,oop,advanced,projects,interview` | Python for PySpark — Home |
| `aws-guide/` | 9: `index,s3,glue,lambda,etl,scd,redshift,airflow,devops` | AWS Data Engineering |

Each lesson layout: `nav.navbar` + `aside.sidebar#sidebar` + `aside#mobile-nav` + `search-overlay` + `bookmarks-panel` + `main.main` + `*/js/main.js` + `*/css/styles.css`.

Search input: `input#search-input.search-modal__input`, trigger `.search-trigger` (`Ctrl+K`).

---

## Navigation Flow

```
index.html (Hub)
 ├─ hub-card -> python-guide/index.html -> basics.html -> ... -> interview.html
 ├─ hub-card -> sql-guide/index.html -> fundamentals.html -> basics.html -> joins.html -> ... -> interview.html / exercises.html
 ├─ hub-card -> pyspark-guide/index.html -> fundamentals.html -> architecture.html -> ... -> interview.html
 ├─ hub-card -> aws-guide/index.html -> s3.html -> glue.html -> ... -> devops.html
 ├─ lesson-grid deep links e.g. sql-guide/window.html#row-number, aws-guide/s3.html#s3-features
 ├─ header -> editor.html (converter, uses data.js + sql-to-pyspark.js)
 ├─ header -> install.html (notebooks)
 └─ discreet -> forensics.html (private)
```

Cross-guide: `navbar__btn` Hub Home -> `../index.html`. Sidebar smooth-scroll for same-page `#anchors` with 64px nav offset.

---

## Shared Scripts

### js/data.js (36L)
`SAMPLE_DATA={users,customers,orders}` columns/rows only.

### js/sql-runner.js (29L)
sql.js WASM `sql.js@1.11.0` in-memory DB. `initSql()`, `loadSampleData()`, `runUserSql(query)`.

### js/sql-to-pyspark.js (545L)
SQL→PySpark DataFrame translator. Covers `SELECT DISTINCT/JOIN/WHERE/GROUP BY/HAVING/ORDER BY/LIMIT/window OVER`. CTE/subquery → `null`.
`tokenize()`, `convertSqlToPySpark(sql)`, `module.exports`.

### js/app.js (127L)
Legacy lesson viewer. `LESSONS[12]`, `renderSidebar()`, `renderMd()`, `selectLesson()`, `updatePySpark()`, `runSql()`, `renderTable()`.

### js/editor.js (74L)
`editor.html` logic. `EXAMPLES[5]`, `renderSchema()`, `renderExamples()`, `update()`, `copyPy()`.

### */js/main.js (4 files)
Same IIFE vanilla pattern:
- `sql-guide/js/main.js` (852L, TOTAL_TOPICS=77)
- `pyspark-guide/js/main.js` (857L, 30)
- `python-guide/js/main.js` (877L, 30)
- `aws-guide/js/main.js` (810L, 39)

Modules (initAll ~829-843): `ThemeManager`, `Search` (TOPICS[] title/tags filter, `<mark>` highlight), `Progress`, `Bookmarks`, `CodeCopy`, `Sidebar` + `SidebarCollapse` + `SidebarSmoothScroll`, `MobileMenu`, `Expandable`, `ScrollSpy`, `DiagramClick`, `ScenarioReveal`, `Animations`.

---

## Styling / Theming

- `css/style.css` (475L): Hub dark glass. `--bg-gradient:#0f172a→#1e1b4b`, `--panel-bg`, `--accent:#38bdf8`, sticky header, sidebar, tables.
- `*/css/styles.css` (~2837L each, same template): Light `:root --color-primary:#2563eb` + `[data-theme="dark"]` overrides. Components: navbar/sidebar/search-modal/badges `badge--easy/intermediate/advanced`, tip/warning/success cards, code blocks, comparison tables.
- Hub cards per-track: `hub-card--sql` blue `rgba(56,189,248)`, `hub-card--pyspark` purple `rgba(124,58,237)` + `.btn-primary{background:#7c3aed}` (`index.html:19-20,28-29`), Python green `rgba(34,197,94)`, AWS amber `rgba(245,158,11)` inline.
- Venn visuals: inline SVG, no external fetch, `role="img"` (`sql-guide/joins.html:402-449`, `pyspark-guide/joins.html:382-422`).
- Placeholders: `https://placehold.co/700xXXX/png?text=` (10 hits, e.g. `sql-guide/window.html:389`, `aws-guide/s3.html:398`).

---

## Storage Keys

Identical in all 4 `*/js/main.js:12-18` (collision note: all guides share same keys):

| Key | Purpose |
|-----|---------|
| `pyspark_theme` | `dark` default, `data-theme` attr |
| `pyspark_completed` | Progress checklist |
| `pyspark_bookmarks` | Bookmarked topic ids |
| `pyspark_sidebar_open` | Sidebar open bool |
| `pyspark_expandable_v2` | Collapsible states |

Theme default: `storage(STORAGE_KEYS.theme,'dark')` (`sql-guide/js/main.js:159`, etc.) + early head script + `<html lang="en" data-theme="dark">` on all 43 guide pages to prevent FOUC.

---

## Recent Fixes

- Badge/button color match (`index.html:19,28-29`): `hub-card--sql` bg `rgba(14,165,233)`→`rgba(56,189,248)` to match `var(--accent)#38bdf8` (`css/style.css:9`); added `hub-card--pyspark .btn-primary{background:#7c3aed;color:#fff}` to match purple badge.
- Venn `alt="SQL JOIN Venn Diagram"` invisible: `upload.wikimedia.org/...Venn_diagram_for_inner_join.svg/800px-...png` → 404 + 400 `Use thumbnail sizes listed on https://w.wiki/GHai` (API `missing`); `via.placeholder.com` → SSL `UNEXPECTED_EOF_WHILE_READING`. Replaced with inline SVG Venns + `placehold.co` for 9 files.
- Dark default: fallback `'light'`→`'dark'` in 4 `main.js`, + `data-theme="dark"` + early `localStorage pyspark_theme` script on 43 HTMLs.

---

*Auto-generated for SQLnPySparkDemo*
