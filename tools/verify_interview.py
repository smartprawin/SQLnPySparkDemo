import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "interview-guide"
fails = []


def chk(cond, msg):
    print(("PASS " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


py = (BASE / "python.html").read_text(encoding="utf-8")
chk("🐍" in py, "python.html emoji intact")
chk("__init__" in py, "__init__ restored")
chk("event-driven" in (BASE / "aws.html").read_text(encoding="utf-8"), "hyphen reflow")
chk("&gt;&gt;" in (BASE / "airflow.html").read_text(encoding="utf-8"), "escaped >> operators")

total = 0
for slug in ["python", "pandas", "sql", "pyspark", "aws",
             "airflow", "azure", "scenarios", "git", "cicd"]:
    h = (BASE / (slug + ".html")).read_text(encoding="utf-8")
    n_card = h.count('class="topic-section expandable-section"')
    n_ans = h.count("<p><strong>Interview Answer:</strong>")
    n_content = h.count('class="expandable-content"')
    total += n_card
    if not (n_card == n_ans == n_content):
        chk(False, "%s: cards/answers/contents %d/%d/%d" % (slug, n_card, n_ans, n_content))
chk(total == 133, "total cards = %d (expect 133)" % total)

for f in BASE.glob("*.html"):
    t = f.read_text(encoding="utf-8")
    if re.search(r"\{[a-z_]+\}|PLACEHOLDER", t):
        chk(False, "placeholder in %s" % f.name)

js = (BASE / "js" / "main.js").read_text(encoding="utf-8")
m = re.search(r"TOTAL_TOPICS = (\d+);", js)
chk(m and m.group(1) == "133", "TOTAL_TOPICS=133")
chk(js.count("id: '") == 133, "TOPICS entries = 133")

css = (BASE / "css" / "styles.css").read_text(encoding="utf-8")
chk("CLICK-TO-REVEAL" in css, "reveal CSS present")
chk("window.__expandTopic" in js and "hashchange" in js, "JS reveal wiring")
chk("Answers are hidden" in py, "hero reveal hint")
chk(py.count("click to reveal answer") == 12, "reveal hints on python page")

data = json.loads((ROOT / "tools" / "golden_questions.json").read_text(encoding="utf-8"))
S = {s["key"]: s for s in data["sections"]}
chk(S["aws"]["questions"][16]["parts"][1]["type"] == "closing", "SCD2 closing in JSON")

print("ALL OK" if not fails else "%d FAILURES" % len(fails))
sys.exit(1 if fails else 0)
