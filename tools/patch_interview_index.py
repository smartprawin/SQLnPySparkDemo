import re, sys
sys.path.insert(0, r"F:\Data Engineering\SQLnPySparkDemo\tools")
from build_interview_guide import sections_html, PANEL_MARKUP

path = r"F:\Data Engineering\SQLnPySparkDemo\interview-guide\index.html"
with open(path, encoding="utf-8") as f:
    html = f.read()

# 1) Full multi-section TOC (replaces single-link sections) in the only sidebar-nav
html = re.sub(
    r'(<nav class="sidebar-nav" style="padding:\.75rem 0;">).*?(</nav>)',
    lambda m: m.group(1) + "\n" + sections_html("        ") + "\n      " + m.group(2),
    html, count=1, flags=re.S)

# 2) Add search + bookmarks buttons to navbar actions
html = html.replace(
    '''<div class="navbar__actions">
      <button class="navbar__btn theme-toggle"''',
    '''<div class="navbar__actions">
      <button class="navbar__btn search-trigger" aria-label="Search" title="Search (Ctrl+K)">🔍</button>
      <button class="navbar__btn" id="bookmarks-toggle" aria-label="Bookmarks" title="Bookmarks">⭐</button>
      <button class="navbar__btn theme-toggle"''')

# 3) Add search overlay + bookmarks panel + progress bar after mobile nav aside
search_overlay = '''  <div class="search-overlay" id="search-overlay">
    <div class="search-modal">
      <div class="search-modal__input-wrapper">
        <span class="search-modal__icon">🔍</span>
        <input id="search-input" class="search-modal__input" type="text" placeholder="Search topics..." />
        <span class="search-modal__shortcut">Ctrl+K</span>
      </div>
      <div id="search-results" class="search-modal__results"></div>
    </div>
  </div>
'''
if 'id="search-overlay"' not in html:
    html = html.replace('  <main class="main"', search_overlay + PANEL_MARKUP + '\n  <main class="main"', 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)
print("index.html patched:", html.count("sidebar__section"), "sections,",
      "search-overlay" if 'id="search-overlay"' in html else "NO-SEARCH",
      "| panel:", 'id="bookmarks-panel"' in html,
      "| progress:", 'id="progress-bar-fill"' in html)
