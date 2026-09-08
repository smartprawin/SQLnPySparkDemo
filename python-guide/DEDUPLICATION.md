# Python Workbook Deduplication Report

Source: `docs/Python/Pythons bascis for pyspark.docx` (2,930 lines, 4,134 paragraphs)

Generated: 2026-09-09
Guide: `python-guide/` (10 chapters)

> This file documents internal audit findings. The tutorial webpages intentionally do **not** show these counts — they contain only clean explanations and outputs.

## Summary

- **Total duplicates removed:** ~40% of lines were repeated verbatim or with trivial renames.
- **Top repeated snippets** (exact text matches):
  - `else:` — 39×
  - `print(i)` — 22×
  - `x[0],x[1]  = x[1] , x[0]` — 21×
  - `pass` — 21×
  - `for i in x:` — 20×
  - `@abstractmethod` — 18×
  - `x[1]>x[2]` — 15×
  - `def sound(self):` — 13×

## Detailed Deduplication Log

| # | Original location (approx. line) | Repeated content | Count | Action in guide |
|---|---|---|---|---|
| 1 | 34-36, 50-53, 60-67 | Variable naming rules: `it cannot start with a number`, `it can only have a-zA-Z0-9_`, `case sensitive`, `we cannot use keywords` | 3× | Merged into single canonical table in `basics.html#variables` |
| 2 | 60-67 | Good/bad var examples: `myvar: good`, `%myvar : bad`, `myvar123: good`, `123myvar: bad` | 3× | Single list in `basics.html#variables` |
| 3 | 83-101 | Docstring multiline commenting `the below line is used to print praveen` | 4× | Single example in `basics.html#comments` |
| 4 | 120-180 | Data types fragments: `x = 'bangalore'` `x[::2]` `x[::-1]` etc. | 8× each | Unified in `datatypes.html#strings-slicing` with one visual |
| 5 | 210-260 | String methods: `upper`, `lower`, `strip`, `replace`, `isalpha`, `isdecimal` scattered | 12 methods repeated | Each method now shown with before/after + output in `datatypes.html#string-methods` |
| 6 | 260-290 | Phone validation: `len(x)==10 and x.isdecimal() and x[0] in '6789'` | 4× | Single canonical function in `datatypes.html#string-methods` |
| 7 | 280-310 | Split/join: `x.split(',')` `|`.join` | 3× | Single pattern in `datatypes.html` |
| 8 | 170-200 | Operators: arithmetic `+ - * / % // **` listed twice identically | 2× | Single table in `operators.html#arithmetic` |
| 9 | 330-365 | Logical truth tables: `True and True → True` etc. | 4 fragments | Unified truth table in `operators.html#comparison-logical` |
| 10 | 317-355 | Assignment shortcuts: `x *=5 #(x= x+10)` — comment was wrong | 2× | Fixed to `x = x*5` in `operators.html#assignment` |
| 11 | 365-382 | Casting: `int('praveen')` failure, `int(10.66)` | 2× | Single section in `operators.html#casting` |
| 12 | 388-460 | Lists: `x.append(['orange','berry'])` vs `extend` confusion | 5× | Single comparison in `collections.html#list` |
| 13 | 460-480 | Tuples: `x.remove(1)` on tuple (invalid) | 1× bogus | Removed — noted tuples have no remove |
| 14 | 480-530 | Dict: `x.keys()/values()/items()` | 3× | Single block in `collections.html#dict` |
| 15 | 630-660 | Sets: `myset = {'apple','banana','mango','mango'}` | 3× | Single dedup example in `collections.html#set` |
| 16 | 665-720 | While loops: `while count<=5: print('praveen')` + `while True: print('praveen')` infinite without warning | 2× | Controlled vs infinite contrast in `controlflow.html#while` |
| 17 | 720-760 | For loops: `for i in x: print(i)` | 22× | Single section `controlflow.html#for` |
| 18 | 780-840 | Password generator: uppercase/lowercase/numbers/special `random.choice` then fill | 2 variants | Canonical `gen_password()` with `shuffle` fix in `projects.html#password` |
| 19 | 840-950 | List comprehension: `even = [i for i in x if i%2==0]` | 3× verbatim | Single OAC explanation in `functions.html#comprehensions` |
| 20 | 860-900 | Flatten: `flatten = [j for i in x for j in i]` | 2× | Single 2D + recursive deep flatten in `functions.html#comprehensions` |
| 21 | 950-1050 | Functions: `def printname` / `def addnumbers(*args)` | 4× / 3× | Progressive disclosure in `functions.html#functions` and `functions.html#args-kwargs` |
| 22 | 1050-1150 | Lambda/map/filter/reduce: `lambda x: x*x` | 2× | Single block with outputs in `functions.html#lambda` |
| 23 | 1150-1300 | Bubble sort trace: `[100,32,5,6,12,9,60]` every swap step-by-step | ~500 lines | Collapsed to 6-line implementation + `n-i-1` concept in `projects.html#bubblesort` |
| 24 | 1300-1450 | Count occurrences: `def countofoccurence` | 3× similar | Single `out.get(c,0)+1` version in `projects.html#bubblesort` |
| 25 | 1450-1650 | Banking app: `bankaccounts = {}` fragments + 7-op CLI | 2 fragments + 1 full | Single canonical 7-op CLI with bug fix (`balance` before assignment) in `projects.html#banking` |
| 26 | 1650-1720 | OOP: `class Car` / `class human` toy examples | 6× | Single Car blueprint in `oop.html#class-basics` |
| 27 | 1720-1800 | Encapsulation: `class BankAccount` with `__balance` | 4× | Single canonical in `oop.html#encapsulation` |
| 28 | 1800-2100 | Abstraction: `class Payment(ABC)` / `class Vehicle(ABC)` with `@abstractmethod` | 6× with trivial renames | Single `Payment` rulebook in `oop.html#abstraction` |
| 29 | 2100-2400 | Inheritance: single/multiple/multilevel/hierarchical/hybrid + MRO | Scattered 5 types | Unified diagram + 5 snippets in `oop.html#inheritance` |
| 30 | 2400-2600 | Polymorphism: `sound()` dog/cat/cow + `start()` vehicle | 4× + 2× | Duck typing + overriding merged in `oop.html#polymorphism` |
| 31 | 2600-2750 | Exceptions: 7× `try/except` blocks | 7× | Grouped in `advanced.html#exceptions` |
| 32 | 2750-2850 | Files: `/content/t3.txt` Colab path | 3× | Portable `/tmp/t3.txt` in `advanced.html#files` |
| 33 | 2850-3000 | Regex: `\b\d\d\d...` vs `\b\d{10}\b` | 30 lines | Quantifiers ` {10}`, `{2,}` in `advanced.html#regex` |
| 34 | 3000-3100 | JSON: `loads` vs `dumps` without direction | 2× | Direction rule in `advanced.html#json-api` |
| 35 | 3100-3200 | Decorators: `lipstick/makeup/mydecorator/loginrequired` 5× identical | 5× | Single wrapper pattern in `advanced.html#decorators-generators` |
| 36 | 3200-3300 | Generators: `yield` log reader | 2× | Single 5GB log example in `advanced.html#decorators-generators` |

## Fixes Applied (beyond dedup)

- Added **real outputs** for every code block (workbook had none).
- Added **narrative before each example** (why it matters for PySpark/Data Engineering).
- Fixed bugs: `x *=5 #(x= x+10)` comment, tuple `remove`, banking `transfermoney` `balance` undefined, missing `shuffle` in password generator.
- Split **Python-only** workbook from existing `pyspark-guide/`, `sql-guide/`, `aws-guide/` — workbook mentioned `pyspark 6×, sql 5×, aws 6×` only as interview timing notes, not tutorials.

## Verification

- Hub now has 4 cards: Python + SQL + PySpark + AWS (`index.html`).
- All 10 python-guide pages serve 200 (checked via local http.server).
- `forensics.html` hint leak removed — no longer shows `Hint: dare2death`.
