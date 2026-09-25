"""Parse GOLDEN_QUESTIONNAIRE_JULY_2026.pdf into structured JSON.

Reads the extracted text (tools/golden_pdf_text.txt; regenerate from the PDF
if missing), applies known extraction fixes, splits it into sections/questions
and writes tools/golden_questions.json:

    {"source": ..., "sections": [{"key", "name", "desc",
                                  "questions": [{"n", "title", "prose", "parts"}]}]}

parts are extra blocks attached to an answer:
    {"type": "code",   "label": "Example"|"Syntax"|"Notes", "text": "..."}
    {"type": "closing","text": "..."}   # "Interview Closing Line: ..."
    {"type": "note",   "text": "..."}   # trailing prose (e.g. Git footnote)

Everything is kept verbatim from the PDF (line wraps reflowed) so no question,
answer, example or closing line is lost.
"""
import json
import re
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
PDF_PATH = Path(r"F:\Data Engineering\Documents\GOLDEN_QUESTIONNAIRE_JULY_2026.pdf")
TXT_PATH = TOOLS / "golden_pdf_text.txt"
JSON_PATH = TOOLS / "golden_questions.json"

EMOJI_TO_KEY = {
    "\U0001F40D": "python",     # snake
    "\U0001F43C": "pandas",     # panda
    "\U0001F5C4": "sql",        # file cabinet
    "\u26A1": "pyspark",        # zap
    "\u2601": "aws",            # cloud
    "\U0001F300": "airflow",    # cyclone
    "\U0001F537": "azure",      # blue diamond
    "\U0001F9E9": "scenarios",  # puzzle
}
GIT_HEADER = "Git & GitHub"
CICD_HEADER = "CI/CD Pipeline Interview Q&A"

EXPECTED_COUNTS = {
    "python": 12, "pandas": 7, "sql": 12, "pyspark": 12, "aws": 17,
    "airflow": 6, "azure": 10, "scenarios": 33, "git": 12, "cicd": 12,
}
EXPECTED_ORDER = ["python", "pandas", "sql", "pyspark", "aws",
                  "airflow", "azure", "scenarios", "git", "cicd"]

CONSTRUCTS = ("Example:", "Syntax:", "Interview Closing Line:")

Q_NUM_RE = re.compile(r"^(\d+)\.\s+(.*)$")
Q_CICD_RE = re.compile(r"^Q(\d+):\s+(.*)$")
HEADER_RE = re.compile(r"^(\U0001F40D|\U0001F43C|\U0001F5C4|\u26A1|\u2601|\U0001F300|\U0001F537|\U0001F9E9)\s+(.+)$")


def load_text():
    if not TXT_PATH.exists():
        try:
            from pypdf import PdfReader
        except ImportError:
            raise SystemExit("pypdf not installed and golden_pdf_text.txt missing")
        reader = PdfReader(str(PDF_PATH))
        text = "\n".join((p.extract_text() or "") for p in reader.pages)
        TXT_PATH.write_text(text, encoding="utf-8")
    text = TXT_PATH.read_text(encoding="utf-8")

    # --- known PDF-extraction fixes (verified against the document) ---
    text = text.replace("\ufe0f", "")          # emoji variation selector
    text = text.replace("\u00b3", "\u2192")    # git workflow arrows (³ -> →)
    text = text.replace("Explain init()", "Explain __init__()")
    text = text.replace("the init() method", "the __init__() method")

    leftover = re.search(r"(?<![_\w])init\(\)", text)
    if leftover:
        print("WARNING: unhandled init() artifact near:", text[leftover.start()-40:leftover.start()+40])
    return text


def reflow(parts):
    """Join wrapped PDF lines into one string; fix words split after hyphens."""
    out = ""
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if not out:
            out = p
        elif out.endswith("-") and p[0].islower():
            out = out[:-1] + p
        else:
            out = out + " " + p
    return re.sub(r"\s+", " ", out).strip()


def strip_outer_quotes(s):
    if s.startswith('"'):
        s = s[1:].lstrip()
    if s.endswith('"'):
        s = s[:-1].rstrip()
    return s


def parse_content(lines, key):
    """Split a question's content into prose + extra parts."""
    lines = [l.rstrip() for l in lines]
    i = 0
    if lines and lines[i].strip() == "Interview Answer:":
        i += 1
    elif lines and lines[i].strip().startswith("Interview Answer:"):
        lines[i] = lines[i].split("Interview Answer:", 1)[1].strip()

    # --- prose ---
    prose_lines = []
    while i < len(lines):
        s = lines[i].strip()
        if not s:
            i += 1
            continue
        if s.startswith(CONSTRUCTS):
            break
        prose_lines.append(s)
        i += 1
        # quoted answer closed on this line
        if s.endswith('"') and any('"' in p for p in prose_lines):
            break
        # unquoted answer ends here: next line is a short standalone fragment
        if s.endswith(".") and i < len(lines):
            nxt = lines[i].strip()
            if nxt and len(nxt) < 30 and not nxt.endswith((".", '"', "?", "!")):
                break
    prose = strip_outer_quotes(reflow(prose_lines))
    if not prose:
        raise ValueError(f"empty prose in {key} content: {lines[:3]}")

    # --- extra parts (Example / Syntax / Closing Line / unlabelled remainder) ---
    parts = []
    j = i
    while j < len(lines):
        s = lines[j].strip()
        if not s:
            j += 1
            continue
        if s.startswith("Interview Closing Line:"):
            buf = [s[len("Interview Closing Line:"):].strip()]
            j += 1
            while j < len(lines) and lines[j].strip() and not lines[j].strip().startswith(CONSTRUCTS):
                buf.append(lines[j].strip())
                j += 1
            parts.append({"type": "closing", "text": strip_outer_quotes(reflow(buf))})
            continue
        if s.startswith("Example:") or s.startswith("Syntax:"):
            label = "Example" if s.startswith("Example:") else "Syntax"
            first = s.split(":", 1)[1].strip()
            buf = ([first] if first else [])
            j += 1
            while j < len(lines) and lines[j].strip() and not lines[j].strip().startswith(CONSTRUCTS):
                buf.append(lines[j])
                j += 1
            parts.append({"type": "code", "label": label, "text": "\n".join(buf).strip()})
            continue
        # unlabelled remainder (git step diagrams, command lists, trailing notes)
        buf = []
        while j < len(lines) and lines[j].strip() and not lines[j].strip().startswith(CONSTRUCTS):
            buf.append(lines[j].strip())
            j += 1
        avg = sum(len(x) for x in buf) / len(buf)
        if avg > 50:
            parts.append({"type": "note", "text": reflow(buf)})
        else:
            parts.append({"type": "code", "label": "Notes", "text": "\n".join(buf)})
    return prose, parts


def split_title_answer(block, key):
    marker = Q_CICD_RE if key == "cicd" else Q_NUM_RE
    m = marker.match(block[0].strip())
    num = int(m.group(1))
    title_parts = [m.group(2).strip()]
    i = 1
    if key == "cicd":
        while i < len(block) and not block[i].strip().startswith('"'):
            title_parts.append(block[i].strip())
            i += 1
    else:
        while i < len(block) and not block[i].strip().startswith("Interview Answer:"):
            title_parts.append(block[i].strip())
            i += 1
    if i >= len(block):
        raise ValueError(f"no answer found for Q{num} in {key}")
    return num, reflow(title_parts), block[i:]


def parse():
    text = load_text()
    lines = text.splitlines()

    # locate section headers
    headers = []
    for idx, ln in enumerate(lines):
        s = ln.strip()
        m = HEADER_RE.match(s)
        if m and m.group(1) in EMOJI_TO_KEY:
            headers.append((idx, EMOJI_TO_KEY[m.group(1)], m.group(1) + " " + m.group(2).strip()))
        elif s == GIT_HEADER:
            headers.append((idx, "git", GIT_HEADER))
        elif s == CICD_HEADER:
            headers.append((idx, "cicd", CICD_HEADER))
    keys = [h[1] for h in headers]
    if keys != EXPECTED_ORDER:
        raise SystemExit(f"section order mismatch: {keys}")

    sections = []
    for hi, (start, key, name) in enumerate(headers):
        end = headers[hi + 1][0] if hi + 1 < len(headers) else len(lines)
        body = lines[start + 1:end]
        marker = Q_CICD_RE if key == "cicd" else Q_NUM_RE

        # description = non-count lines before the first question
        qstarts = [i for i, ln in enumerate(body) if marker.match(ln.strip())]
        if not qstarts:
            raise SystemExit(f"no questions found in section {key}")
        desc_lines = []
        for ln in body[:qstarts[0]]:
            s = ln.strip()
            if not s or re.fullmatch(r"\d+\s*Questions?|\d+|Questions", s) or s == "Interview Questions":
                continue
            desc_lines.append(s)

        questions = []
        for qi, qs in enumerate(qstarts):
            qend = qstarts[qi + 1] if qi + 1 < len(qstarts) else len(body)
            block = body[qs:qend]
            while block and not block[-1].strip():
                block.pop()
            num, title, content = split_title_answer(block, key)
            prose, parts = parse_content(content, key)
            questions.append({"n": num, "title": title, "prose": prose, "parts": parts})

        expected = EXPECTED_COUNTS[key]
        if len(questions) != expected:
            raise SystemExit(f"{key}: parsed {len(questions)} questions, PDF says {expected}")
        for want, q in enumerate(questions, 1):
            if q["n"] != want:
                raise SystemExit(f"{key}: numbering break at Q{q['n']} (expected {want})")
        sections.append({"key": key, "name": name, "desc": reflow(desc_lines),
                         "questions": questions})

    data = {"source": "GOLDEN_QUESTIONNAIRE_JULY_2026.pdf", "sections": sections}
    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")

    total = sum(len(s["questions"]) for s in sections)
    print(f"wrote {JSON_PATH.name}: {total} questions")
    for s in sections:
        extra = sum(1 for q in s["questions"] for p in q["parts"])
        print(f"  {s['key']:<10} {len(s['questions']):>3} questions  "
              f"{extra:>3} extra parts  desc={s['desc'][:60]}...")
    return data


if __name__ == "__main__":
    parse()
