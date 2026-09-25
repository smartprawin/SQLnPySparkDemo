import html
import json
import os

BASE = r"F:\Data Engineering\SQLnPySparkDemo\interview-guide"
TOOLS = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(TOOLS, "golden_questions.json"), encoding="utf-8") as f:
    GOLDEN = json.load(f)

SECTIONS = {s["key"]: s for s in GOLDEN["sections"]}
DESC = {k: s["desc"] for k, s in SECTIONS.items()}

PAGES = [
 ("python", "🐍 Python", "Python Interview Q&A", None, "22c55e"),
 ("pandas", "🐼 Pandas", "Pandas Interview Q&A", None, "22c55e"),
 ("sql", "🗄️ SQL", "SQL Interview Q&A", None, "0ea5e9"),
 ("pyspark", "⚡ PySpark", "PySpark Interview Q&A", None, "7c3aed"),
 ("aws", "☁️ AWS", "AWS Interview Q&A", None, "f59e0b"),
 ("airflow", "🌀 Airflow", "Airflow Interview Q&A", None, "0284c7"),
 ("azure", "🔷 Azure", "Azure Interview Q&A", None, "2563eb"),
 ("scenarios", "🧩 Scenarios", "Scenario-Based Q&A", None, "db2777"),
 ("git", "🌿 Git & GitHub", "Git & GitHub Q&A", None, "16a34a"),
 ("cicd", "🚀 CI/CD", "CI/CD Pipeline Q&A", None, "ea580c"),
]

missing = {p[0] for p in PAGES} - set(SECTIONS)
extra = set(SECTIONS) - {p[0] for p in PAGES}
if missing or extra:
    raise SystemExit(f"page/section mismatch: missing={missing} extra={extra}")

# DATA[slug] = [{"title", "prose", "parts"}] — verbatim from GOLDEN_QUESTIONNAIRE_JULY_2026.pdf
DATA = {slug: SECTIONS[slug]["questions"] for slug, *_ in PAGES}

def esc(t):
    return html.escape(t, quote=False)

NAVBAR = """      <a href="../index.html" class="navbar__btn" title="Back to Hub Home">🏠 Hub</a>
      <a href="index.html" class="navbar__btn">Home</a>
      <a href="python.html" class="navbar__btn">Python</a>
      <a href="pandas.html" class="navbar__btn">Pandas</a>
      <a href="sql.html" class="navbar__btn">SQL</a>
      <a href="pyspark.html" class="navbar__btn">PySpark</a>
      <a href="aws.html" class="navbar__btn">AWS</a>
      <a href="airflow.html" class="navbar__btn">Airflow</a>
      <a href="azure.html" class="navbar__btn">Azure</a>
      <a href="scenarios.html" class="navbar__btn">Scenarios</a>
      <a href="git.html" class="navbar__btn">Git</a>
      <a href="cicd.html" class="navbar__btn">CI/CD</a>"""

def sidebar(active):
    items = []
    for slug, emoji, title, desc, color in PAGES:
        cls = "navbar__btn--primary" if slug == active else ""
        items.append(f'      <div class="sidebar__section is-collapsed">\n        <div class="sidebar__heading"><span>{title}</span><span class="sidebar__heading-icon">▼</span></div>\n        <ul class="sidebar__links">\n          <li><a href="{slug}.html" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Open {title}</a></li>\n        </ul>\n      </div>')
    return "\n".join(items)

def qcard(qid, num, item):
    body = [f'          <p><strong>Interview Answer:</strong> {esc(item["prose"])}</p>']
    for part in item["parts"]:
        if part["type"] == "code":
            body.append(f'''          <div class="code-block">
            <div class="code-block__header">
              <span class="code-block__lang">{esc(part.get("label", "Code"))}</span>
              <button class="code-block__copy" aria-label="Copy code">Copy</button>
            </div>
            <pre><code>{esc(part["text"])}</code></pre>
          </div>''')
        elif part["type"] == "closing":
            body.append(f'          <div class="tip-card"><div class="tip-card__title">Interview Closing Line</div><div class="tip-card__body">{esc(part["text"])}</div></div>')
        elif part["type"] == "note":
            body.append(f'          <p style="color:var(--color-text-secondary);font-size:.875rem;font-style:italic;border-left:3px solid var(--color-border);padding-left:.75rem;margin:.75rem 0;">{esc(part["text"])}</p>')
    body_html = "\n".join(body)
    return f'''      <section id="{qid}" class="topic-section expandable-section">
        <div class="topic-section__header">
          <span class="badge badge--intermediate">🟡 Intermediate</span>
          <div class="topic-section__actions">
            <button class="bookmark-btn" data-topic-id="{qid}">☆</button>
            <button class="topic-complete-btn" data-topic-id="{qid}">Mark as Complete</button>
          </div>
        </div>
        <div class="expandable-header">
          <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;">
            <span style="font-weight:700;color:var(--color-primary);">Q{num}</span>
            <h2 style="margin:0;font-size:1rem;font-weight:600;">{esc(item["title"])}</h2>
            <span style="font-size:.7rem;color:var(--color-text-tertiary);">click to reveal answer</span>
          </div>
          <span class="expandable-icon">▶</span>
        </div>
        <div class="expandable-content">
{body_html}
        </div>
      </section>'''

def sections_html(indent="      "):
    """Full multi-section TOC — same structure as sql-guide/aws-guide sidebars:
    every lesson is a collapsible section; JS auto-expands the section matching
    the current file, heading click toggles, scroll-spy highlights active link."""
    out = []
    for sslug, emoji, stitle, sdesc, scolor in PAGES:
        qs = DATA[sslug]
        links = "\n".join(
            f'{indent}  <li><a href="{sslug}.html#{sslug}-{i+1}" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Q{i+1}. {esc(q["title"])}</a></li>'
            for i, q in enumerate(qs))
        out.append(
            f'{indent}<div class="sidebar__section is-collapsed">\n'
            f'{indent}  <div class="sidebar__heading"><span>{emoji} ({len(qs)})</span><span class="sidebar__heading-icon">▼</span></div>\n'
            f'{indent}  <ul class="sidebar__links">\n'
            f'{links}\n'
            f'{indent}  </ul>\n'
            f'{indent}</div>')
    return "\n".join(out)

PANEL_MARKUP = '''  <div class="bookmarks-panel" id="bookmarks-panel" style="position:fixed;top:var(--nav-height);right:0;width:320px;max-height:calc(100vh - var(--nav-height));background:var(--color-surface);border-left:1px solid var(--color-border);z-index:150;overflow-y:auto;padding:1.25rem;display:none;">
    <div class="bookmarks-panel__header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
      <h3 style="font-size:1rem;font-weight:600;margin:0;color:var(--color-heading);">Bookmarks</h3>
      <button class="bookmarks-panel__close" style="background:none;border:none;cursor:pointer;font-size:1.1rem;color:var(--color-text-secondary);padding:.1rem .4rem;" aria-label="Close bookmarks">✕</button>
    </div>
    <div id="bookmarks-list"></div>
  </div>
  <div class="progress-bar" style="position:fixed;top:var(--nav-height);left:var(--sidebar-width);right:0;height:4px;z-index:90;background:var(--color-bg-tertiary);">
    <div class="progress-bar__track" style="height:4px;">
      <div class="progress-bar__fill" id="progress-bar-fill" style="width:0%;"></div>
    </div>
  </div>'''

def page_html(slug, emoji, title, desc, color):
    qs = DATA[slug]
    cards = "\n".join(qcard(f"{slug}-{i+1}", i+1, q) for i, q in enumerate(qs))
    sections_m = sections_html("      ")
    sections_d = sections_html("      ")
    safe_desc = esc(desc)
    return f"""<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <script>try{{var k="pyspark_theme";var v=localStorage.getItem(k);var t=v?JSON.parse(v):"dark";document.documentElement.setAttribute("data-theme",t);}}catch(e){{document.documentElement.setAttribute("data-theme","dark");}}</script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} - Interview Prep (Golden Questionnaire July 2026)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <nav class="navbar">
    <a href="index.html" class="navbar__brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      <span class="navbar__title">Interview Prep • Golden 2026</span>
    </a>
    <div class="navbar__spacer"></div>
    <div class="navbar__links" style="display:flex;gap:.25rem;align-items:center;flex-wrap:nowrap;overflow-x:auto;">
{NAVBAR}
    </div>
    <div class="navbar__actions">
      <button class="navbar__btn search-trigger" aria-label="Search" title="Search (Ctrl+K)">🔍</button>
      <button class="navbar__btn" id="bookmarks-toggle" aria-label="Bookmarks" title="Bookmarks">⭐</button>
      <button class="navbar__btn theme-toggle" id="theme-toggle" aria-label="Toggle theme"><span class="icon-sun" style="display:none;">☀️</span><span class="icon-moon">🌙</span></button>
      <button class="sidebar-toggle" id="hamburger" aria-label="Toggle navigation"><span class="hamburger"><span class="hamburger__bar"></span><span class="hamburger__bar"></span><span class="hamburger__bar"></span></span></button>
      <a href="../index.html" class="navbar__btn hub-mobile" title="Back to Hub Home">🏠 Hub</a>
    </div>
  </nav>
  <div class="sidebar-overlay" id="mobile-overlay"></div>
  <aside class="sidebar" id="mobile-nav" aria-label="Mobile navigation">
    <div style="padding:1.5rem 1.25rem 1rem;">
      <div style="font-weight:700;font-size:1.125rem;color:var(--color-heading);margin-bottom:1rem;">🎯 Interview Prep</div>
      <nav class="sidebar-nav" style="padding:.75rem 0;">
{sections_m}
      </nav>
    </div>
  </aside>
  <div class="search-overlay" id="search-overlay">
    <div class="search-modal">
      <div class="search-modal__input-wrapper">
        <span class="search-modal__icon">🔍</span>
        <input id="search-input" class="search-modal__input" type="text" placeholder="Search topics..." />
        <span class="search-modal__shortcut">Ctrl+K</span>
      </div>
      <div id="search-results" class="search-modal__results"></div>
    </div>
  </div>
{PANEL_MARKUP}
  <aside class="sidebar" id="sidebar">
    <div style="padding:.5rem 1.25rem .75rem;border-bottom:1px solid var(--color-border);">
      <button id="sidebar-toggle" style="background:none;border:none;cursor:pointer;padding:.25rem;color:var(--color-text-secondary);font-size:.8rem;display:flex;align-items:center;gap:.375rem;width:100%;justify-content:space-between;">
        <span style="font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--color-text-tertiary);">Contents</span>
        <span style="font-size:.625rem;">◀</span>
      </button>
    </div>
    <nav class="sidebar-nav" style="padding:.75rem 0;">
{sections_d}
    </nav>
  </aside>
  <main class="main" style="margin-left:var(--sidebar-width);">
    <div class="main__content">
      <section class="hero" style="background:linear-gradient(135deg,#{color} 0%,#6366f1 60%,#0f172a 100%);padding:3rem 2rem;border-radius:16px;color:#fff;position:relative;overflow:hidden;margin-bottom:2rem;">
        <div style="position:relative;z-index:1;">
          <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.15);padding:.35rem .85rem;border-radius:999px;font-size:.85rem;margin-bottom:1rem;">{emoji} Golden Questionnaire July 2026 • {len(qs)} Questions</div>
          <h1 style="font-size:2.2rem;font-weight:800;color:#fff;margin:.5rem 0;">{title}</h1>
          <p style="font-size:1.05rem;opacity:.92;max-width:680px;">{safe_desc}</p>
          <p style="opacity:.8;font-size:.9rem;">Source: GOLDEN_QUESTIONNAIRE_JULY_2026.pdf • Answers are hidden — click a question to reveal its full interview answer. Use bookmarks + Mark as Complete to track prep.</p>
        </div>
      </section>
{cards}
      <div style="display:flex;gap:.75rem;margin:2rem 0;flex-wrap:wrap;">
        <a href="index.html" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:.75rem 1.25rem;text-decoration:none;font-weight:600;">← All Interview Lessons</a>
        <a href="../index.html" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:.75rem 1.25rem;text-decoration:none;font-weight:600;">🏠 Hub Home</a>
      </div>
    </div>
  </main>
  <footer style="margin-left:var(--sidebar-width);padding:2rem 3rem;border-top:1px solid var(--color-border);text-align:center;color:var(--color-text-tertiary);font-size:.875rem;">
    <p>Interview Prep — Golden Questionnaire July 2026 • {title}</p>
    <p style="margin-top:.5rem;">© 2026 Mastery Hub. Built for Data Engineers.</p>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>"""

if __name__ == "__main__":
    os.makedirs(BASE, exist_ok=True)
    for slug, emoji, title, desc, color in PAGES:
        with open(os.path.join(BASE, slug + ".html"), "w", encoding="utf-8") as f:
            f.write(page_html(slug, emoji, title, DESC[slug], color))
        print("wrote", slug, len(DATA[slug]))
