import re, sys
sys.path.insert(0, r"F:\Data Engineering\SQLnPySparkDemo\tools")
from build_interview_guide import DATA

js_path = r"F:\Data Engineering\SQLnPySparkDemo\interview-guide\js\main.js"
with open(js_path, encoding="utf-8") as f:
    js = f.read()

entries = []
total = 0
for slug, qs in DATA.items():
    for i, q in enumerate(qs):
        title = q["title"].replace("\\", "\\\\").replace("'", "\\'")
        hay = " ".join([q["title"], q["prose"]] + [p.get("text", "") for p in q["parts"]])
        tags = re.sub(r"[^a-z0-9 ]", " ", hay.lower())
        tags = re.sub(r"\s+", " ", tags)[:300]
        entries.append(f"    {{ id: '{slug}-{i+1}', title: '{title}', url: '{slug}.html#{slug}-{i+1}', tags: '{tags}' }}")
        total += 1

new_topics = "var TOPICS = [\n" + ",\n".join(entries) + "\n  ];"
js = re.sub(r"var TOPICS = \[.*?\];", new_topics, js, count=1, flags=re.S)
js = re.sub(r"var TOTAL_TOPICS = \d+;", f"var TOTAL_TOPICS = {total};", js, count=1)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print(f"patched main.js: {total} topics")
