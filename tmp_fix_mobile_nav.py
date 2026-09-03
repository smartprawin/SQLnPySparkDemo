import re, glob, os

for base in [r'F:/Data Engineering/SQLnPySparkDemo/pyspark-guide', r'F:/Data Engineering/SQLnPySparkDemo/sql-guide']:
    for f in glob.glob(base+'/*.html'):
        txt = open(f, encoding='utf-8').read()
        # Find desktop sidebar nav content
        m_sidebar = re.search(r'<aside class="sidebar" id="sidebar">.*?<nav class="sidebar-nav"[^>]*>(.*?)</nav>\s*</aside>', txt, re.S)
        if not m_sidebar:
            continue
        sidebar_nav_inner = m_sidebar.group(1)
        # Find mobile nav
        m_mobile = re.search(r'<aside class="sidebar" id="mobile-nav"[^>]*>(.*?)</aside>', txt, re.S)
        if not m_mobile:
            continue
        mobile_inner = m_mobile.group(1)
        # Check if mobile already has full nav (contains many sections like Fundamentals and Execution etc.)
        # Simple check: does mobile contain 'What is Spark' ?
        if 'What is Spark' in mobile_inner and 'What is PySpark' in mobile_inner and 'Transformations vs Actions' in mobile_inner:
            # Already has full, skip
            continue
        # Create new mobile inner with header + full nav
        # Use appropriate title
        title = "SQL Mastery" if "sql-guide" in base else "PySpark Guide"
        new_mobile_inner = f'''
    <div style="padding:1.5rem 1.25rem 1rem;">
      <div style="font-weight:700;font-size:1.125rem;color:var(--color-heading);margin-bottom:1rem;">{title}</div>
      <nav class="sidebar-nav" style="padding:.75rem 0;">
{sidebar_nav_inner}
      </nav>
    </div>
  '''
        # Replace
        old_mobile_full = m_mobile.group(0)
        # Construct new aside
        new_mobile_full = f'<aside class="sidebar" id="mobile-nav" aria-label="Mobile navigation">{new_mobile_inner}</aside>'
        txt = txt.replace(old_mobile_full, new_mobile_full)
        open(f, 'w', encoding='utf-8').write(txt)
        print(f"Updated mobile nav in {os.path.basename(f)}")

print("Done")
