import os
BASE = r"F:\Data Engineering\SQLnPySparkDemo\interview-guide"

PAGES = [
 ("python", "🐍 Python", "Python Interview Q&A", "12 Questions — data types, comprehensions, OOP, lambda, decorators, args/kwargs, generators", "22c55e"),
 ("pandas", "🐼 Pandas", "Pandas Interview Q&A", "7 Questions — DataFrame vs Series, GroupBy, merge/join, loc vs iloc, nulls", "22c55e"),
 ("sql", "🗄️ SQL", "SQL Interview Q&A", "12 Questions — normalization, window functions, joins, indexes, CTEs, optimization", "0ea5e9"),
 ("pyspark", "⚡ PySpark", "PySpark Interview Q&A", "12 Questions — architecture, RDDs, lazy evaluation, cache/persist, skew, salting", "7c3aed"),
 ("aws", "☁️ AWS", "AWS Interview Q&A", "17 Questions — S3, Glue, Lambda, Redshift, DMS, Kinesis, Athena, SCD", "f59e0b"),
 ("airflow", "🌀 Airflow", "Airflow Interview Q&A", "6 Questions — DAGs, XCom, triggers, retries, dependencies, Step Functions", "0284c7"),
 ("azure", "🔷 Azure", "Azure Interview Q&A", "10 Questions — ADF, Databricks, Delta Lake, Unity Catalog, Key Vault, PII", "2563eb"),
 ("scenarios", "🧩 Scenarios", "Scenario-Based Q&A", "33 Questions — pipelines, failures, performance, schema evolution, SCD, APIs, PII", "db2777"),
 ("git", "🌿 Git & GitHub", "Git & GitHub Q&A", "12 Questions — workflow, branching, merging, PRs, conflicts, fetch vs pull", "16a34a"),
 ("cicd", "🚀 CI/CD", "CI/CD Pipeline Q&A", "12 Questions — PR checks, environments, secrets, IaC, approvals, monitoring", "ea580c"),
]

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

def qcard(qid, num, q, ans, code=None, tip=None, level="🟡 Intermediate"):
    code_html = ""
    if code:
        code_html = f'''\n        <div class="code-block">\n          <div class="code-block__header">\n            <span class="code-block__lang">Code</span>\n            <button class="code-block__copy" aria-label="Copy code">Copy</button>\n          </div>\n          <pre><code>{code}</code></pre>\n        </div>'''
    tip_html = f'''\n        <div class="tip-card"><div class="tip-card__title">Interview Tip</div><div class="tip-card__body">{tip}</div></div>''' if tip else ""
    return f'''      <section id="{qid}" class="topic-section">
        <div class="topic-section__header">
          <span class="badge badge--intermediate">{level}</span>
          <div class="topic-section__actions">
            <button class="bookmark-btn" data-topic-id="{qid}">☆</button>
            <button class="topic-complete-btn" data-topic-id="{qid}">Mark as Complete</button>
          </div>
        </div>
        <h2>Q{num}. {q}</h2>
        <p><strong>Interview Answer:</strong> {ans}</p>{code_html}{tip_html}
      </section>'''

# ---- QUESTION DATA (from GOLDEN_QUESTIONNAIRE_JULY_2026.pdf) ----
DATA = {}

DATA["python"] = [
 ("List vs Tuple vs Set vs Dictionary", "Lists are mutable and ordered, tuples are immutable and ordered. Sets store only unique elements and provide fast membership testing, while dictionaries store key-value pairs for efficient lookups. In projects, I use lists for record collections, tuples for fixed values, sets for dedup, dicts for lookups.", "l = [1,2,3]  # mutable\nt = (1,2,3)  # immutable\ns = {1,2,3}  # unique\n# d = {'a': 1}  # key-value", "Say where you use each in ETL: lists for rows, dicts for mappings, sets for dedup."),
 ("What is List & Dictionary Comprehension?", "Concise single-line way to create lists/dicts. More readable and generally faster than loops. List comprehension returns a list, dict comprehension returns key-value pairs. I use them for quick transforms and filtering.", "evens = [x for x in range(10) if x % 2 == 0]\nsquares = {x: x*x for x in range(5)}", None),
 ("What is Inheritance and its types?", "OOP concept letting one class inherit properties/methods from another, promoting reuse. Python supports Single, Multiple, Multilevel, Hierarchical, Hybrid. Reduces duplication. I use it for specialized classes from common bases.", "class Base: pass\nclass Child(Base): pass  # single inheritance", None),
 ("What is a Lambda Function?", "Anonymous single-line function for simple ops without def. Commonly used with map(), filter(), reduce(). Shorter code for small transforms. I use them for lightweight data processing.", "add = lambda x, y: x + y\nnums = list(map(lambda x: x*2, [1,2,3]))", None),
 ("What are Decorators?", "Functions extending/modifying another function's behavior without changing source, via @ symbol. Used for logging, auth, caching, timing. In DE projects, useful for logging ETL job execution.", "@timer\ndef etl(): pass  # decorator adds timing/logging", "Mention ETL logging/timing use-case."),
 ("Shallow Copy vs Deep Copy?", "Shallow copy creates new object but shares nested references — nested changes affect both. Deep copy creates fully independent copy. Python: copy() vs deepcopy(). I use deepcopy for nested structures.", "import copy\na = [[1,2],[3,4]]\nshallow = copy.copy(a)\ndeep = copy.deepcopy(a)", None),
 ("What are *args and **kwargs?", "*args accepts any number of positional args (stored as tuple), **kwargs accepts keyword args (stored as dict). Makes functions flexible. I use them when input count is unknown.", "def f(*args, **kwargs):\n    print(args, kwargs)", None),
 ("What is a Constructor? Explain __init__()", "Special method auto-called on object creation. In Python it's __init__(). Used to initialize attributes with defaults/user values so every object starts with required state.", "class Emp:\n    def __init__(self, name):\n        self.name = name", None),
 ("What are Generators?", "Functions producing values one at a time via yield instead of returning all at once. Memory efficient — generate on demand. Ideal for large files/streaming. In DE, useful for big datasets.", "def gen():\n    for i in range(1000000):\n        yield i", "Stress memory efficiency for large files."),
 ("What are the OOP Concepts?", "Four pillars: Encapsulation (restrict direct access), Abstraction (hide details), Inheritance (reuse), Polymorphism (same interface, multiple forms). Makes code modular, reusable, maintainable.", None, None),
 ("Multi-threading vs Multi-processing?", "Threading: multiple threads in same process, best for I/O-bound (API calls, files). Multiprocessing: separate processes + memory, ideal for CPU-intensive, not limited by GIL. Choose by workload.", None, None),
 ("How does Garbage Collection work in Python?", "Automatic memory via reference counting + gc module. When refcount hits zero, memory released. gc also breaks circular references. Prevents leaks, improves performance.", "import gc\ngc.collect()  # force collection", None),
]

DATA["pandas"] = [
 ("DataFrame vs Series?", "Series is 1-D single column with index; DataFrame is 2-D table of rows + columns (collection of Series sharing index). I mainly use DataFrames since ETL involves multiple columns.", "import pandas as pd\ns = pd.Series([1,2,3])\ndf = pd.DataFrame({'a':[1,2],'b':[3,4]})", None),
 ("Read file formats (CSV, JSON, Parquet, Excel)?", "Dedicated readers: read_csv(), read_json(), read_parquet(), read_excel(). Choose per source, then clean before processing.", "df = pd.read_csv('f.csv')\ndf = pd.read_json('f.json')\ndf = pd.read_parquet('f.parquet')\ndf = pd.read_excel('f.xlsx')", None),
 ("Merge vs Join vs Concat?", "Merge combines on common columns (SQL-like joins). Join combines on indexes. Concat appends row/column-wise without keys. I mostly use merge for customer/transaction joins.", "pd.merge(a, b, on='id', how='inner')\na.join(b)\npd.concat([a, b])", None),
 ("LOC vs ILOC?", "loc = label-based, iloc = integer-position-based. Use loc for column names/indexes, iloc for positional selection. Both for validation/EDA.", "df.loc[0, 'col']\ndf.iloc[0, 1]", None),
 ("Remove duplicate rows?", "Use drop_duplicates(), optionally subset=[cols]. Key data-quality step before loading to target.", "df.drop_duplicates(subset=['id'], inplace=True)", None),
 ("Explode nested JSON?", "Flatten with json_normalize(), then explode() list-columns into separate rows for relational loading.", "from pandas import json_normalize\ndf = json_normalize(data)\ndf = df.explode('items')", None),
 ("Pandas vs PySpark?", "Pandas = single-machine, in-memory, small/medium data. PySpark = distributed, multi-node, big data. I use Pandas locally, PySpark for production ETL.", None, "Good differentiator answer."),
]

DATA["sql"] = [
 ("Normalization (1NF, 2NF, 3NF)? Pros/cons?", "Organizing data to reduce redundancy, improve integrity. 1NF removes repeating groups, 2NF removes partial dependency, 3NF removes transitive dependency. Pro: less duplication/consistency. Con: more joins can hurt performance.", None, None),
 ("Denormalization? When/why?", "Combining tables to reduce joins, improve read speed at cost of redundancy. Mainly reporting/DWH where reads matter more than storage.", None, None),
 ("Window Functions? ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER", "Calculations across row-sets without grouping. ROW_NUMBER=unique numbers, RANK skips after ties, DENSE_RANK doesn't, LAG/LEAD prev/next rows, SUM OVER running totals. Used in analytics.", "SELECT name, salary,\n ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn,\n RANK() OVER (PARTITION BY dept ORDER BY salary DESC) rnk,\n LAG(salary) OVER (ORDER BY id) prev_sal\nFROM emp;", None),
 ("Types of JOINs?", "INNER (matches), LEFT/RIGHT (all from one side), FULL OUTER (all both), CROSS (cartesian), SELF (self-join).", "SELECT * FROM a INNER JOIN b ON a.id=b.id;", None),
 ("CTE? Why? Advantages?", "Temporary result via WITH. Improves readability, simplifies complex SQL, avoids repeating subqueries. I use for multi-step transforms + recursion.", "WITH cte AS (SELECT * FROM emp WHERE sal>50000)\nSELECT * FROM cte;", None),
 ("Indexing? Clustered vs Non-Clustered?", "Index speeds lookup vs full scan. Clustered = physical sorted order, one per table. Non-clustered = pointers, many per table.", "CREATE INDEX idx_emp_dept ON emp(dept_id);", None),
 ("Stored Procedure? Advantages?", "Precompiled SQL batch stored in DB. Reuses plan, less network traffic, better security, easier maintenance of business logic.", "CREATE PROCEDURE GetEmp AS SELECT * FROM emp;", None),
 ("WHERE vs HAVING (4 differences)?", "WHERE filters rows before grouping, no aggregates, executes earlier/faster. HAVING filters groups after GROUP BY, allows aggregates.", "SELECT dept, COUNT(*) FROM emp\nWHERE sal>10000 GROUP BY dept HAVING COUNT(*)>5;", None),
 ("Order of execution?", "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Helps write optimized queries.", None, "Interviewers love this."),
 ("Primary / Foreign / Unique / Composite keys?", "PK = unique row ID, no NULLs. FK = relationship between tables. Unique = uniqueness, allows one NULL. Composite = 2+ cols combined as key.", None, None),
 ("DELETE vs DROP vs TRUNCATE? Is TRUNCATE DDL or DML?", "DELETE = selected rows, rollback-able, slow/logged. TRUNCATE = all rows fast, deallocates pages, DDL. DROP = whole structure + data.", "DELETE FROM emp WHERE id=1;\nTRUNCATE TABLE emp;\nDROP TABLE emp;", "TRUNCATE is DDL."),
 ("SQL optimization techniques?", "Proper indexes, select only needed cols (no SELECT *), filter early with WHERE, avoid functions on indexed cols, check execution plans, efficient joins, partition large tables.", None, None),
]

DATA["pyspark"] = [
 ("Spark Architecture?", "Master-worker: Driver creates plan + coordinates, Cluster Manager allocates resources, Executors on workers run tasks + cache in memory. Enables large-scale processing.", None, "Draw Driver → CM → Executors."),
 ("What happens after spark-submit?", "Driver starts, requests resources, Executors launch, Driver builds DAG from transformations. On action, tasks scheduled, executors process in parallel, results returned.", None, None),
 ("RDD vs DataFrame vs Dataset?", "RDD = low-level, full control, no optimization. DataFrame = structured + schema + Catalyst optimizer, faster. Dataset = DF optimization + compile-time type safety (Scala/Java). In PySpark I use DataFrames.", "rdd = sc.parallelize([1,2,3])\ndf = spark.createDataFrame([(1,'a')], ['id','n'])", None),
 ("Lazy Evaluation? Why important?", "Transformations recorded in DAG, executed only on action (show/count/collect). Lets Spark optimize, skip unnecessary work, boost performance.", "df2 = df.filter('sal>5000')  # lazy\ndf2.count()  # action triggers", None),
 ("Narrow vs Wide transformations?", "Narrow = same partition, no shuffle (map/filter/flatMap), fast. Wide = cross-partition shuffle (groupBy/join/reduceByKey), costly.", None, None),
 ("Sort-Merge vs Shuffle-Hash Join?", "Sort-Merge shuffles + sorts both sides, best for large data, Spark default. Shuffle-Hash shuffles but hashes smaller side, faster when one side much smaller.", None, None),
 ("Cache vs Persist?", "Both store for reuse. cache() = memory-only default. persist() = configurable (memory/disk/both). Use cache for small hot data, persist for large not fitting memory.", "df.cache()\ndf.persist(StorageLevel.MEMORY_AND_DISK)", None),
 ("Repartition vs Coalesce?", "Repartition = up/down + full shuffle, balances before joins. Coalesce = mainly reduce, no full shuffle, faster. Repartition for parallelism, coalesce before writes.", "df.repartition(10)\ndf.coalesce(2)", None),
 ("Data Skewness? Causes? Fixes?", "Few partitions hold far more data → stragglers. Caused by uneven keys in joins/aggs. Fix: salting, broadcast, repartition, filter skewed keys.", None, None),
 ("Salting? Why + code?", "Add random value to skewed keys to spread across partitions, prevents one executor overload, improves joins.", "from pyspark.sql.functions import concat, lit, rand, floor\ndf1 = df1.withColumn('salted_key', concat(df1.id, lit('_'), floor(rand()*5)))", "Must-know code snippet."),
 ("Spark performance optimization?", "Partitioning, broadcast joins, caching, avoid shuffles, select needed cols, Parquet, tune executor memory/partition size, monitor Spark UI.", None, None),
 ("Broadcast Join vs Salting?", "Broadcast = small table sent to all executors, no shuffle. Salting = spreads skewed keys. Use broadcast for lookups, salting for skew-slowed joins.", "from pyspark.sql.functions import broadcast\ndf.join(broadcast(small), 'id')", None),
]

DATA["aws"] = [
 ("S3 + Storage Classes?", "S3 = durable/scalable object store for raw+processed data. Classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier IR/Flexible/Deep Archive.", None, None),
 ("AWS Glue? Components + features?", "Serverless ETL to discover/transform/load. Components: Catalog, Crawler, Jobs, Triggers, Workflows, Bookmarks. Features: auto schema discovery, serverless Spark, S3/Redshift/Athena integration.", None, None),
 ("Glue DynamicFrames vs DataFrames?", "DynamicFrames handle semi-structured/inconsistent data + schema variations without failing. Convert to DataFrames for Spark SQL/perf.", "dyf.toDF()  # to Spark DF", None),
 ("Warehouse vs Lake vs Lakehouse?", "Warehouse = structured/curated for BI. Lake = raw structured+unstructured cheap. Lakehouse = lake flexibility + warehouse ACID, for analytics + ML.", None, None),
 ("Glue Job Bookmarks? Incremental?", "Track already-processed data; next run processes only new/modified records. Enables incremental loads, less time/cost.", None, None),
 ("Glue vs EMR vs Lambda?", "Glue = serverless ETL. EMR = managed Hadoop/Spark for large workloads w/ control. Lambda = short event-driven compute. ETL→Glue, heavy Spark→EMR, automation→Lambda.", None, None),
 ("Glue CI/CD to higher envs?", "Scripts in Git; pipeline (CodePipeline/CodeBuild/Jenkins) validates + deploys to Dev/QA/Prod. Bucket names/roles parameterized per env.", None, None),
 ("Lambda? Features? Limits?", "Serverless event-driven compute, auto-scale, pay-per-use. Limits: 15-min timeout, package/memory/concurrency limits.", None, None),
 ("Athena advantages?", "Serverless SQL on S3, no infra, Glue Catalog integration, Parquet/ORC support, pay per scanned data. Ideal ad-hoc.", None, None),
 ("Redshift architecture?", "MPP: Leader Node plans queries, Compute Nodes process in parallel, columnar storage for fast analytics.", None, None),
 ("Athena vs Redshift vs Spectrum?", "Athena = direct S3 queries. Redshift = managed DW for BI. Spectrum = Redshift querying external S3. Ad-hoc→Athena, dashboards→Redshift, combined→Spectrum.", None, None),
 ("Optimize Athena?", "Parquet/ORC, partitioning, compression, select needed cols, prune partitions. Less scanned = faster + cheaper.", None, None),
 ("Redshift distribution styles + syntax?", "AUTO, EVEN, KEY, ALL. EVEN=equal, KEY=by column, ALL=copy small tables everywhere, AUTO=auto. DISTKEY on join cols.", "CREATE TABLE employee (emp_id INT, dept_id INT, name VARCHAR(50))\nDISTSTYLE KEY DISTKEY(dept_id);", None),
 ("Dist Key vs Sort Key?", "Dist = distribution across nodes (join perf, less movement). Sort = physical sort within node (filter/scan perf). Dist on joins, Sort on date filters.", None, None),
 ("CloudWatch? Uses?", "Monitoring for metrics/logs/events. I monitor Glue, Lambda, EC2, alarms for failures/resource spikes.", None, None),
 ("DMS + CDC?", "Managed DB migration w/ minimal downtime. Full load + CDC reading transaction logs for inserts/updates/deletes to target.", None, None),
 ("SCD Types? SCD2 example?", "Techniques for dimension changes: T1 overwrite, T2 history via new row, T3 limited history. T2: expire old (end-date, N), insert new active row. Implemented in PySpark by diffing.", "101 Delhi 2024-01-01 NULL Y  →\n101 Delhi 2024-01-01 2025-06-30 N\n101 Mumbai 2025-07-01 NULL Y", "Quote ETL project: expire + insert."),
]

DATA["airflow"] = [
 ("DAG? How it works?", "Directed Acyclic Graph = ordered workflow of tasks. Dependencies set order. Airflow schedules, executes, monitors. I use DAGs for ETL.", None, None),
 ("XCom? xcom_push/pull?", "Cross-task small-data sharing. push stores, pull retrieves. I pass filenames/IDs/status.", 'ti.xcom_push(key="file_name", value="sales.csv")\nfile = ti.xcom_pull(key="file_name")', None),
 ("Ways to trigger a DAG?", "Schedule (cron), manual UI, CLI, REST API, TriggerDagRunOperator from another DAG.", None, None),
 ("Task retries?", "Auto-retry per retries + retry_delay config. After exhausting, marked failed + alerts.", "default_args={'retries':3,'retry_delay':timedelta(minutes=5)}", None),
 ("Airflow vs Step Functions?", "Airflow = ETL scheduling/orchestration. Step Functions = coordinate AWS services (Lambda/Glue/ECS) serverless. Complex data→Airflow, AWS events→SFN.", None, None),
 ("Define dependencies?", ">> / << or set_upstream/downstream. Ensures order: extract → transform → load.", "task1 >> task2 >> task3", None),
]

DATA["azure"] = [
 ("Why ADF?", "Automate/orchestrate ETL: move sources → ADLS/Databricks. Handles scheduling, monitoring, error handling, less manual effort.", None, None),
 ("Incremental loading in ADF?", "Watermark col (Last_Updated_Date): each run loads only new/updated rows. Faster.", None, None),
 ("ADF activities used?", "Copy Data (move), Lookup (config), ForEach (multi-file), If Condition (validation), Stored Procedure, Execute Pipeline.", None, None),
 ("Unity Catalog?", "Databricks centralized governance: tables/files/permissions/access, fine-grained security, auditing, sharing.", None, None),
 ("Liquid Clustering?", "Auto-organizes data w/o manual repartition. Less scanned → faster. More flexible than static partitioning.", None, None),
 ("Delta Lake? Features?", "Open storage layer on lake: ACID, schema enforcement/evolution, time travel, versioning. Reliable ETL.", None, None),
 ("Managed vs External tables?", "Managed = data+metadata in Databricks (drop deletes data). External = metadata only, data in ADLS/S3 (drop keeps data).", None, None),
 ("Key Vault?", "Secure secrets (passwords/keys/conn strings). No hardcoding; apps fetch securely. Better security.", None, None),
 ("Databricks? Architecture?", "Cloud Spark platform for big data/ML. Control Plane (clusters/notebooks) + Data Plane (Spark processing). Scalable/collaborative.", None, None),
 ("Secure PII?", "Mask/encrypt (name/email/phone), RBAC, Key Vault secrets, encryption at rest/in transit.", None, None),
]

DATA["scenarios"] = [
 ("Duplicate daily S3 sales records?", "Detect via PK/business keys, dropDuplicates() in Spark, fix source cause, add DQ checks for future.", "df.dropDuplicates(['order_id'])", None),
 ("Glue 10min → 1hr?", "Check CloudWatch logs, look for skew/shuffles/data growth. Fix: partitioning, caching, Parquet. Re-monitor.", None, None),
 ("Spark OOM on executors?", "Spark UI → bad stage. Avoid collect() on big data, bump executor memory, cut shuffles, repartition, salt/broadcast for skew.", None, None),
 ("Schema evolution broke ETL?", "Enable evolution: update Crawler/Catalog in Glue; schema merging in Spark so new cols don't break.", "spark.read.option('mergeSchema','true').parquet(path)", None),
 ("On-prem SQL → Redshift migration?", "Right Dist/Sort keys, compression, bulk load via S3, optimize queries, monitor. Perf + cost.", None, None),
 ("Redshift query runs hours?", "Check plan + system tables, verify Dist/Sort, ANALYZE stats, drop needless joins, rewrite.", None, None),
 ("Airflow DAG missing connection?", "Logs → missing conn, Admin→Connections fix creds, test, rerun failed task, document.", None, None),
 ("3 sources, 1 failed but partial load?", "Pre-ETL validation: all sources present/complete else stop + alert. No incomplete loads.", None, None),
 ("Batch → near-real-time dashboards?", "Streaming: Kafka / Structured Streaming / Kinesis. Continuous processing, refresh secs/mins.", None, None),
 ("CSV in S3 slow in Athena?", "Convert to Parquet via Glue (columnar), partition by date/region, compress. Less scanned.", None, None),
 ("One key = 90% rows (skew)?", "Find via UI/distribution, then salt heavy key or broadcast if small table. Even distribution.", None, None),
 ("GDPR PII masking/encryption?", "Find PII cols, mask/encrypt before store, IAM + S3 encryption, authorized-only access.", None, None),
 ("SCD2 in Glue w/ perf?", "Diff source/target, expire old, insert new. Parquet + partitioning for query speed.", None, None),
 ("SLA before 8AM, volume 2x?", "Cut shuffles, partition, incremental not full, monitor, scale cluster. Meet SLA.", None, None),
 ("Missing Python pkgs in prod?", "Bundle deps with Glue/Lambda/Spark, test in dev before prod.", None, None),
 ("API → S3 with throttling/retries/incremental?", "Retry w/ backoff on limits, incremental via timestamps/IDs, fewer calls.", None, None),
 ("Inconsistent downstream results?", "Verify ETL completion, compare source/target counts, check partial loads, add DQ + alerts.", None, None),
 ("Monolith → micro-ETL?", "Split into small independent jobs: easier maintain/test/debug, isolated failures, faster deploys.", None, None),
 ("Training data structured+unstructured?", "Collect all, clean/validate/dedup/standardize, join on keys, DQ checks, store in lake.", None, None),
 ("AWS region outage?", "Cross-region replication + backups, failover to secondary. Continuity, min downtime.", None, None),
 ("Fraud near-real-time alerts on AWS?", "Kinesis capture → Lambda/Streaming rules → SNS/email on fraud. Near-real-time.", None, None),
 ("Daily job failed, no load?", "CloudWatch/Airflow logs → root cause, rerun failed only, validate, notify stakeholders.", None, None),
 ("TABLE1(0,1,1,2,3,NULL) TABLE2(1,2,3,NULL,NULL) joins?", "Cross=30 rows (6×5). Left=all T1+matches. Right=all T2+matches. Full=all both.", None, None),
 ("Resume 40%→fail w/o redo?", "Checkpointing/incremental: store last good batch, resume from there. Saves time/cost.", None, None),
 ("Large files without Spark?", "Chunked processing: generators / Pandas chunks / batches. No full-memory load.", "for chunk in pd.read_csv(f, chunksize=10000): process(chunk)", None),
 ("100 stores API every 10min + exceptions?", "Airflow/Lambda schedule, per-store task w/ retry, log+retry failures independently, land in S3.", None, None),
 ("KPI: extract/clean/load?", "Extract source/API → clean (dedup, nulls, rules) → load Redshift/S3, accurate KPIs.", None, None),
 ("Block duplicates downstream?", "Dedup on business/PK keys + dropDuplicates() + DQ checks. Only uniques downstream.", None, None),
 ("New client, vendors, 15 changing metrics?", "Per-vendor ingestion → raw S3 → standardized transforms + metrics → Redshift. Airflow scheduled.", None, None),
 ("E-commerce pipeline tables/cols?", "Customers, Products, Orders, Order_Items, Payments, Shipments. IDs, qty, price, status, dates.", None, None),
 ("Oracle→ES 36hrs?", "Incremental not full, parallelize, tune batch, cut transforms, monitor bottlenecks.", None, None),
 ("Production issue faced?", "Duplicates from resent file: caught via count validation, removed via business keys, added DQ checks.", None, None),
 ("Project SLA?", "Full ETL before 8AM daily for fresh reports. Monitored, optimized Spark, alerts.", None, None),
]

DATA["git"] = [
 ("How did you use Git?", "Version control: separate branches per dev, local commits, push to GitHub, PR review, merge to main. Safe collaboration.", None, None),
 ("Git workflow?", "Clone → feature branch → code+commit → push → PR → review → merge main → deploy.", "git clone → checkout -b feat → commit → push → PR → merge", None),
 ("What happens on git push?", "Uploads local commits to remote GitHub for team access. Then open PR for review/merge.", "git push origin feature-branch", None),
 ("Why branches?", "Isolate features/fixes from main. Each dev own branch; merge after review.", "git branch feat/x\ngit checkout feat/x", None),
 ("What is a Pull Request?", "Request to merge branches. Enables review/suggestions/approval before merge. Quality gate.", None, None),
 ("Merge conflict? Resolve?", "Two devs edit same lines — Git can't auto-decide. Review both, keep correct, test, commit resolved.", None, None),
 ("Most-used Git commands?", "clone, status, add, commit, pull, push, branch, checkout, merge — covers daily work.", "git status\ngit add .\ngit commit -m 'msg'\ngit pull\ngit push", None),
 ("Local behind remote?", "git pull latest, resolve conflicts, test, push updated.", "git pull origin main", None),
 ("Check changed files before commit?", "git status for staged/untracked, git diff for exact lines.", "git status\ngit diff", None),
 ("Prod issue with Git?", "Conflict on same file: reviewed, tested final, merged, told team to pull latest.", None, None),
 ("git fetch vs git pull?", "fetch = download only, no merge. pull = download + merge. I use pull to stay updated.", "git fetch\ngit pull", None),
 ("Wrong file committed?", "Local-only: undo + recommit. Pushed: revert or fix-forward commit per team process.", "git reset HEAD~1  # local\n# git revert <sha>  # pushed", None),
]

DATA["cicd"] = [
 ("What happens on Pull Request?", "CI auto-triggers: code quality, unit tests, SQL/PySpark/Airflow DAG validation. Pass + approval → merge to main, ready to deploy.", None, None),
 ("Why Dev/QA/Prod?", "Test safely: Dev for changes, QA for validation, Prod only approved code. Less prod risk, better quality.", None, None),
 ("Unit tests fail in CI?", "Pipeline stops, no further deploy. Dev checks logs, fixes, pushes; pipeline re-runs till green.", None, None),
 ("Why never secrets in Git?", "Exposed to unauthorized users. Use Secrets Manager / Parameter Store / Key Vault.", None, None),
 ("Benefit of IaC?", "Infra as code (Terraform/CDK): automated, consistent, versioned, faster deploys vs manual.", None, None),
 ("Same code to multiple envs?", "Same code, different configs: buckets/DBs/roles/secrets per Dev/QA/Prod. Safer.", None, None),
 ("Approval gates in Prod?", "Manual approval after verifying tests/logs/release notes. Blocks bad deploys.", None, None),
 ("Safe prod deployment?", "All tests + DQ pass, validated in Dev/QA, rollback plan ready.", None, None),
 ("Monitor after deploy?", "CloudWatch logs, Glue status, Airflow runs, timings, alerts, source-target counts.", None, None),
 ("Common CI/CD prod issues?", "Failed tests, missing pkgs, IAM errors, broken DAGs, schema mismatch, bad env vars. Logs → fix → redeploy.", None, None),
 ("Role of Git in CI/CD?", "Version control: branches + PRs. Merge to main auto-triggers test/deploy pipeline.", None, None),
 ("Reduce deployment failures?", "Auto tests, reviews, env configs, secret mgmt, validate Dev/QA first. Stable releases.", None, None),
]

def sections_html(indent="      "):
    """Full multi-section TOC — same structure as sql-guide/aws-guide sidebars:
    every lesson is a collapsible section; JS auto-expands the section matching
    the current page, heading click toggles, scroll-spy highlights active link."""
    out = []
    for sslug, emoji, stitle, sdesc, scolor in PAGES:
        qs = DATA[sslug]
        links = "\n".join(
            f'{indent}  <li><a href="{sslug}.html#{sslug}-{i+1}" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Q{i+1}. {q[0]}</a></li>'
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
    norm = [(q[0], q[1], q[2] if len(q) > 2 else None, q[3] if len(q) > 3 else None) for q in qs]
    cards = "\n".join(qcard(f"{slug}-{i+1}", i+1, q, a, c, t) for i, (q, a, c, t) in enumerate(norm))
    sections_m = sections_html("      ")
    sections_d = sections_html("      ")
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
          <p style="font-size:1.05rem;opacity:.92;max-width:680px;">{desc}</p>
          <p style="opacity:.8;font-size:.9rem;">Source: GOLDEN_QUESTIONNAIRE_JULY_2026.pdf • Each card = interview-ready answer. Use bookmarks + Mark as Complete to track prep.</p>
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

os.makedirs(BASE, exist_ok=True)
for slug, emoji, title, desc, color in PAGES:
    with open(os.path.join(BASE, slug+".html"), "w", encoding="utf-8") as f:
        f.write(page_html(slug, emoji, title, desc, color))
    print("wrote", slug, len(DATA[slug]))
