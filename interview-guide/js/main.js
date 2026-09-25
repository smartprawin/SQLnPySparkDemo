/**
 * PySpark Interview Guide - Main JavaScript
 * Vanilla JS · IIFE Pattern · Production Quality
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  //  CONSTANTS
  // ---------------------------------------------------------------------------
  var TOTAL_TOPICS = 133;
  var STORAGE_KEYS = {
    theme:      'pyspark_theme',
    completed:  'pyspark_completed',
    bookmarks:  'pyspark_bookmarks',
    sidebar:    'pyspark_sidebar_open',
    expandable: 'pyspark_expandable_v2'
  };

  // All searchable topics (id, title, url, content summary) - AWS Data Engineering
  // NOTE: tags mirror docs/AWS/AWS lessons.txt vocabulary so doc phrases are findable via search.
  var TOPICS = [
    { id: 'python-1', title: 'List vs Tuple vs Set vs Dictionary', url: 'python.html#python-1', tags: 'list vs tuple vs set vs dictionary lists are mutable and ordered tuples are immutable and ordered sets store only unique elements and provide fast membership testing while dictionaries store key value pairs for efficient lookups in projects i use lists for record collections tuples for fixed values ' },
    { id: 'python-2', title: 'What is List & Dictionary Comprehension?', url: 'python.html#python-2', tags: 'what is list dictionary comprehension concise single line way to create lists dicts more readable and generally faster than loops list comprehension returns a list dict comprehension returns key value pairs i use them for quick transforms and filtering ' },
    { id: 'python-3', title: 'What is Inheritance and its types?', url: 'python.html#python-3', tags: 'what is inheritance and its types oop concept letting one class inherit properties methods from another promoting reuse python supports single multiple multilevel hierarchical hybrid reduces duplication i use it for specialized classes from common bases ' },
    { id: 'python-4', title: 'What is a Lambda Function?', url: 'python.html#python-4', tags: 'what is a lambda function anonymous single line function for simple ops without def commonly used with map filter reduce shorter code for small transforms i use them for lightweight data processing ' },
    { id: 'python-5', title: 'What are Decorators?', url: 'python.html#python-5', tags: 'what are decorators functions extending modifying another function s behavior without changing source via symbol used for logging auth caching timing in de projects useful for logging etl job execution ' },
    { id: 'python-6', title: 'Shallow Copy vs Deep Copy?', url: 'python.html#python-6', tags: 'shallow copy vs deep copy shallow copy creates new object but shares nested references nested changes affect both deep copy creates fully independent copy python copy vs deepcopy i use deepcopy for nested structures ' },
    { id: 'python-7', title: 'What are *args and **kwargs?', url: 'python.html#python-7', tags: 'what are args and kwargs args accepts any number of positional args stored as tuple kwargs accepts keyword args stored as dict makes functions flexible i use them when input count is unknown ' },
    { id: 'python-8', title: 'What is a Constructor? Explain __init__()', url: 'python.html#python-8', tags: 'what is a constructor explain init special method auto called on object creation in python it s init used to initialize attributes with defaults user values so every object starts with required state ' },
    { id: 'python-9', title: 'What are Generators?', url: 'python.html#python-9', tags: 'what are generators functions producing values one at a time via yield instead of returning all at once memory efficient generate on demand ideal for large files streaming in de useful for big datasets ' },
    { id: 'python-10', title: 'What are the OOP Concepts?', url: 'python.html#python-10', tags: 'what are the oop concepts four pillars encapsulation restrict direct access abstraction hide details inheritance reuse polymorphism same interface multiple forms makes code modular reusable maintainable ' },
    { id: 'python-11', title: 'Multi-threading vs Multi-processing?', url: 'python.html#python-11', tags: 'multi threading vs multi processing threading multiple threads in same process best for i o bound api calls files multiprocessing separate processes memory ideal for cpu intensive not limited by gil choose by workload ' },
    { id: 'python-12', title: 'How does Garbage Collection work in Python?', url: 'python.html#python-12', tags: 'how does garbage collection work in python automatic memory via reference counting gc module when refcount hits zero memory released gc also breaks circular references prevents leaks improves performance ' },
    { id: 'pandas-1', title: 'DataFrame vs Series?', url: 'pandas.html#pandas-1', tags: 'dataframe vs series series is 1 d single column with index dataframe is 2 d table of rows columns collection of series sharing index i mainly use dataframes since etl involves multiple columns ' },
    { id: 'pandas-2', title: 'Read file formats (CSV, JSON, Parquet, Excel)?', url: 'pandas.html#pandas-2', tags: 'read file formats csv json parquet excel dedicated readers read csv read json read parquet read excel choose per source then clean before processing ' },
    { id: 'pandas-3', title: 'Merge vs Join vs Concat?', url: 'pandas.html#pandas-3', tags: 'merge vs join vs concat merge combines on common columns sql like joins join combines on indexes concat appends row column wise without keys i mostly use merge for customer transaction joins ' },
    { id: 'pandas-4', title: 'LOC vs ILOC?', url: 'pandas.html#pandas-4', tags: 'loc vs iloc loc label based iloc integer position based use loc for column names indexes iloc for positional selection both for validation eda ' },
    { id: 'pandas-5', title: 'Remove duplicate rows?', url: 'pandas.html#pandas-5', tags: 'remove duplicate rows use drop duplicates optionally subset cols key data quality step before loading to target ' },
    { id: 'pandas-6', title: 'Explode nested JSON?', url: 'pandas.html#pandas-6', tags: 'explode nested json flatten with json normalize then explode list columns into separate rows for relational loading ' },
    { id: 'pandas-7', title: 'Pandas vs PySpark?', url: 'pandas.html#pandas-7', tags: 'pandas vs pyspark pandas single machine in memory small medium data pyspark distributed multi node big data i use pandas locally pyspark for production etl ' },
    { id: 'sql-1', title: 'Normalization (1NF, 2NF, 3NF)? Pros/cons?', url: 'sql.html#sql-1', tags: 'normalization 1nf 2nf 3nf pros cons organizing data to reduce redundancy improve integrity 1nf removes repeating groups 2nf removes partial dependency 3nf removes transitive dependency pro less duplication consistency con more joins can hurt performance ' },
    { id: 'sql-2', title: 'Denormalization? When/why?', url: 'sql.html#sql-2', tags: 'denormalization when why combining tables to reduce joins improve read speed at cost of redundancy mainly reporting dwh where reads matter more than storage ' },
    { id: 'sql-3', title: 'Window Functions? ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER', url: 'sql.html#sql-3', tags: 'window functions row number rank dense rank lag lead sum over calculations across row sets without grouping row number unique numbers rank skips after ties dense rank doesn t lag lead prev next rows sum over running totals used in analytics ' },
    { id: 'sql-4', title: 'Types of JOINs?', url: 'sql.html#sql-4', tags: 'types of joins inner matches left right all from one side full outer all both cross cartesian self self join ' },
    { id: 'sql-5', title: 'CTE? Why? Advantages?', url: 'sql.html#sql-5', tags: 'cte why advantages temporary result via with improves readability simplifies complex sql avoids repeating subqueries i use for multi step transforms recursion ' },
    { id: 'sql-6', title: 'Indexing? Clustered vs Non-Clustered?', url: 'sql.html#sql-6', tags: 'indexing clustered vs non clustered index speeds lookup vs full scan clustered physical sorted order one per table non clustered pointers many per table ' },
    { id: 'sql-7', title: 'Stored Procedure? Advantages?', url: 'sql.html#sql-7', tags: 'stored procedure advantages precompiled sql batch stored in db reuses plan less network traffic better security easier maintenance of business logic ' },
    { id: 'sql-8', title: 'WHERE vs HAVING (4 differences)?', url: 'sql.html#sql-8', tags: 'where vs having 4 differences where filters rows before grouping no aggregates executes earlier faster having filters groups after group by allows aggregates ' },
    { id: 'sql-9', title: 'Order of execution?', url: 'sql.html#sql-9', tags: 'order of execution from where group by having select order by helps write optimized queries ' },
    { id: 'sql-10', title: 'Primary / Foreign / Unique / Composite keys?', url: 'sql.html#sql-10', tags: 'primary foreign unique composite keys pk unique row id no nulls fk relationship between tables unique uniqueness allows one null composite 2 cols combined as key ' },
    { id: 'sql-11', title: 'DELETE vs DROP vs TRUNCATE? Is TRUNCATE DDL or DML?', url: 'sql.html#sql-11', tags: 'delete vs drop vs truncate is truncate ddl or dml delete selected rows rollback able slow logged truncate all rows fast deallocates pages ddl drop whole structure data ' },
    { id: 'sql-12', title: 'SQL optimization techniques?', url: 'sql.html#sql-12', tags: 'sql optimization techniques proper indexes select only needed cols no select filter early with where avoid functions on indexed cols check execution plans efficient joins partition large tables ' },
    { id: 'pyspark-1', title: 'Spark Architecture?', url: 'pyspark.html#pyspark-1', tags: 'spark architecture master worker driver creates plan coordinates cluster manager allocates resources executors on workers run tasks cache in memory enables large scale processing ' },
    { id: 'pyspark-2', title: 'What happens after spark-submit?', url: 'pyspark.html#pyspark-2', tags: 'what happens after spark submit driver starts requests resources executors launch driver builds dag from transformations on action tasks scheduled executors process in parallel results returned ' },
    { id: 'pyspark-3', title: 'RDD vs DataFrame vs Dataset?', url: 'pyspark.html#pyspark-3', tags: 'rdd vs dataframe vs dataset rdd low level full control no optimization dataframe structured schema catalyst optimizer faster dataset df optimization compile time type safety scala java in pyspark i use dataframes ' },
    { id: 'pyspark-4', title: 'Lazy Evaluation? Why important?', url: 'pyspark.html#pyspark-4', tags: 'lazy evaluation why important transformations recorded in dag executed only on action show count collect lets spark optimize skip unnecessary work boost performance ' },
    { id: 'pyspark-5', title: 'Narrow vs Wide transformations?', url: 'pyspark.html#pyspark-5', tags: 'narrow vs wide transformations narrow same partition no shuffle map filter flatmap fast wide cross partition shuffle groupby join reducebykey costly ' },
    { id: 'pyspark-6', title: 'Sort-Merge vs Shuffle-Hash Join?', url: 'pyspark.html#pyspark-6', tags: 'sort merge vs shuffle hash join sort merge shuffles sorts both sides best for large data spark default shuffle hash shuffles but hashes smaller side faster when one side much smaller ' },
    { id: 'pyspark-7', title: 'Cache vs Persist?', url: 'pyspark.html#pyspark-7', tags: 'cache vs persist both store for reuse cache memory only default persist configurable memory disk both use cache for small hot data persist for large not fitting memory ' },
    { id: 'pyspark-8', title: 'Repartition vs Coalesce?', url: 'pyspark.html#pyspark-8', tags: 'repartition vs coalesce repartition up down full shuffle balances before joins coalesce mainly reduce no full shuffle faster repartition for parallelism coalesce before writes ' },
    { id: 'pyspark-9', title: 'Data Skewness? Causes? Fixes?', url: 'pyspark.html#pyspark-9', tags: 'data skewness causes fixes few partitions hold far more data stragglers caused by uneven keys in joins aggs fix salting broadcast repartition filter skewed keys ' },
    { id: 'pyspark-10', title: 'Salting? Why + code?', url: 'pyspark.html#pyspark-10', tags: 'salting why code add random value to skewed keys to spread across partitions prevents one executor overload improves joins ' },
    { id: 'pyspark-11', title: 'Spark performance optimization?', url: 'pyspark.html#pyspark-11', tags: 'spark performance optimization partitioning broadcast joins caching avoid shuffles select needed cols parquet tune executor memory partition size monitor spark ui ' },
    { id: 'pyspark-12', title: 'Broadcast Join vs Salting?', url: 'pyspark.html#pyspark-12', tags: 'broadcast join vs salting broadcast small table sent to all executors no shuffle salting spreads skewed keys use broadcast for lookups salting for skew slowed joins ' },
    { id: 'aws-1', title: 'S3 + Storage Classes?', url: 'aws.html#aws-1', tags: 's3 storage classes s3 durable scalable object store for raw processed data classes standard intelligent tiering standard ia one zone ia glacier ir flexible deep archive ' },
    { id: 'aws-2', title: 'AWS Glue? Components + features?', url: 'aws.html#aws-2', tags: 'aws glue components features serverless etl to discover transform load components catalog crawler jobs triggers workflows bookmarks features auto schema discovery serverless spark s3 redshift athena integration ' },
    { id: 'aws-3', title: 'Glue DynamicFrames vs DataFrames?', url: 'aws.html#aws-3', tags: 'glue dynamicframes vs dataframes dynamicframes handle semi structured inconsistent data schema variations without failing convert to dataframes for spark sql perf ' },
    { id: 'aws-4', title: 'Warehouse vs Lake vs Lakehouse?', url: 'aws.html#aws-4', tags: 'warehouse vs lake vs lakehouse warehouse structured curated for bi lake raw structured unstructured cheap lakehouse lake flexibility warehouse acid for analytics ml ' },
    { id: 'aws-5', title: 'Glue Job Bookmarks? Incremental?', url: 'aws.html#aws-5', tags: 'glue job bookmarks incremental track already processed data next run processes only new modified records enables incremental loads less time cost ' },
    { id: 'aws-6', title: 'Glue vs EMR vs Lambda?', url: 'aws.html#aws-6', tags: 'glue vs emr vs lambda glue serverless etl emr managed hadoop spark for large workloads w control lambda short event driven compute etl glue heavy spark emr automation lambda ' },
    { id: 'aws-7', title: 'Glue CI/CD to higher envs?', url: 'aws.html#aws-7', tags: 'glue ci cd to higher envs scripts in git pipeline codepipeline codebuild jenkins validates deploys to dev qa prod bucket names roles parameterized per env ' },
    { id: 'aws-8', title: 'Lambda? Features? Limits?', url: 'aws.html#aws-8', tags: 'lambda features limits serverless event driven compute auto scale pay per use limits 15 min timeout package memory concurrency limits ' },
    { id: 'aws-9', title: 'Athena advantages?', url: 'aws.html#aws-9', tags: 'athena advantages serverless sql on s3 no infra glue catalog integration parquet orc support pay per scanned data ideal ad hoc ' },
    { id: 'aws-10', title: 'Redshift architecture?', url: 'aws.html#aws-10', tags: 'redshift architecture mpp leader node plans queries compute nodes process in parallel columnar storage for fast analytics ' },
    { id: 'aws-11', title: 'Athena vs Redshift vs Spectrum?', url: 'aws.html#aws-11', tags: 'athena vs redshift vs spectrum athena direct s3 queries redshift managed dw for bi spectrum redshift querying external s3 ad hoc athena dashboards redshift combined spectrum ' },
    { id: 'aws-12', title: 'Optimize Athena?', url: 'aws.html#aws-12', tags: 'optimize athena parquet orc partitioning compression select needed cols prune partitions less scanned faster cheaper ' },
    { id: 'aws-13', title: 'Redshift distribution styles + syntax?', url: 'aws.html#aws-13', tags: 'redshift distribution styles syntax auto even key all even equal key by column all copy small tables everywhere auto auto distkey on join cols ' },
    { id: 'aws-14', title: 'Dist Key vs Sort Key?', url: 'aws.html#aws-14', tags: 'dist key vs sort key dist distribution across nodes join perf less movement sort physical sort within node filter scan perf dist on joins sort on date filters ' },
    { id: 'aws-15', title: 'CloudWatch? Uses?', url: 'aws.html#aws-15', tags: 'cloudwatch uses monitoring for metrics logs events i monitor glue lambda ec2 alarms for failures resource spikes ' },
    { id: 'aws-16', title: 'DMS + CDC?', url: 'aws.html#aws-16', tags: 'dms cdc managed db migration w minimal downtime full load cdc reading transaction logs for inserts updates deletes to target ' },
    { id: 'aws-17', title: 'SCD Types? SCD2 example?', url: 'aws.html#aws-17', tags: 'scd types scd2 example techniques for dimension changes t1 overwrite t2 history via new row t3 limited history t2 expire old end date n insert new active row implemented in pyspark by diffing ' },
    { id: 'airflow-1', title: 'DAG? How it works?', url: 'airflow.html#airflow-1', tags: 'dag how it works directed acyclic graph ordered workflow of tasks dependencies set order airflow schedules executes monitors i use dags for etl ' },
    { id: 'airflow-2', title: 'XCom? xcom_push/pull?', url: 'airflow.html#airflow-2', tags: 'xcom xcom push pull cross task small data sharing push stores pull retrieves i pass filenames ids status ' },
    { id: 'airflow-3', title: 'Ways to trigger a DAG?', url: 'airflow.html#airflow-3', tags: 'ways to trigger a dag schedule cron manual ui cli rest api triggerdagrunoperator from another dag ' },
    { id: 'airflow-4', title: 'Task retries?', url: 'airflow.html#airflow-4', tags: 'task retries auto retry per retries retry delay config after exhausting marked failed alerts ' },
    { id: 'airflow-5', title: 'Airflow vs Step Functions?', url: 'airflow.html#airflow-5', tags: 'airflow vs step functions airflow etl scheduling orchestration step functions coordinate aws services lambda glue ecs serverless complex data airflow aws events sfn ' },
    { id: 'airflow-6', title: 'Define dependencies?', url: 'airflow.html#airflow-6', tags: 'define dependencies or set upstream downstream ensures order extract transform load ' },
    { id: 'azure-1', title: 'Why ADF?', url: 'azure.html#azure-1', tags: 'why adf automate orchestrate etl move sources adls databricks handles scheduling monitoring error handling less manual effort ' },
    { id: 'azure-2', title: 'Incremental loading in ADF?', url: 'azure.html#azure-2', tags: 'incremental loading in adf watermark col last updated date each run loads only new updated rows faster ' },
    { id: 'azure-3', title: 'ADF activities used?', url: 'azure.html#azure-3', tags: 'adf activities used copy data move lookup config foreach multi file if condition validation stored procedure execute pipeline ' },
    { id: 'azure-4', title: 'Unity Catalog?', url: 'azure.html#azure-4', tags: 'unity catalog databricks centralized governance tables files permissions access fine grained security auditing sharing ' },
    { id: 'azure-5', title: 'Liquid Clustering?', url: 'azure.html#azure-5', tags: 'liquid clustering auto organizes data w o manual repartition less scanned faster more flexible than static partitioning ' },
    { id: 'azure-6', title: 'Delta Lake? Features?', url: 'azure.html#azure-6', tags: 'delta lake features open storage layer on lake acid schema enforcement evolution time travel versioning reliable etl ' },
    { id: 'azure-7', title: 'Managed vs External tables?', url: 'azure.html#azure-7', tags: 'managed vs external tables managed data metadata in databricks drop deletes data external metadata only data in adls s3 drop keeps data ' },
    { id: 'azure-8', title: 'Key Vault?', url: 'azure.html#azure-8', tags: 'key vault secure secrets passwords keys conn strings no hardcoding apps fetch securely better security ' },
    { id: 'azure-9', title: 'Databricks? Architecture?', url: 'azure.html#azure-9', tags: 'databricks architecture cloud spark platform for big data ml control plane clusters notebooks data plane spark processing scalable collaborative ' },
    { id: 'azure-10', title: 'Secure PII?', url: 'azure.html#azure-10', tags: 'secure pii mask encrypt name email phone rbac key vault secrets encryption at rest in transit ' },
    { id: 'scenarios-1', title: 'Duplicate daily S3 sales records?', url: 'scenarios.html#scenarios-1', tags: 'duplicate daily s3 sales records detect via pk business keys dropduplicates in spark fix source cause add dq checks for future ' },
    { id: 'scenarios-2', title: 'Glue 10min → 1hr?', url: 'scenarios.html#scenarios-2', tags: 'glue 10min 1hr check cloudwatch logs look for skew shuffles data growth fix partitioning caching parquet re monitor ' },
    { id: 'scenarios-3', title: 'Spark OOM on executors?', url: 'scenarios.html#scenarios-3', tags: 'spark oom on executors spark ui bad stage avoid collect on big data bump executor memory cut shuffles repartition salt broadcast for skew ' },
    { id: 'scenarios-4', title: 'Schema evolution broke ETL?', url: 'scenarios.html#scenarios-4', tags: 'schema evolution broke etl enable evolution update crawler catalog in glue schema merging in spark so new cols don t break ' },
    { id: 'scenarios-5', title: 'On-prem SQL → Redshift migration?', url: 'scenarios.html#scenarios-5', tags: 'on prem sql redshift migration right dist sort keys compression bulk load via s3 optimize queries monitor perf cost ' },
    { id: 'scenarios-6', title: 'Redshift query runs hours?', url: 'scenarios.html#scenarios-6', tags: 'redshift query runs hours check plan system tables verify dist sort analyze stats drop needless joins rewrite ' },
    { id: 'scenarios-7', title: 'Airflow DAG missing connection?', url: 'scenarios.html#scenarios-7', tags: 'airflow dag missing connection logs missing conn admin connections fix creds test rerun failed task document ' },
    { id: 'scenarios-8', title: '3 sources, 1 failed but partial load?', url: 'scenarios.html#scenarios-8', tags: '3 sources 1 failed but partial load pre etl validation all sources present complete else stop alert no incomplete loads ' },
    { id: 'scenarios-9', title: 'Batch → near-real-time dashboards?', url: 'scenarios.html#scenarios-9', tags: 'batch near real time dashboards streaming kafka structured streaming kinesis continuous processing refresh secs mins ' },
    { id: 'scenarios-10', title: 'CSV in S3 slow in Athena?', url: 'scenarios.html#scenarios-10', tags: 'csv in s3 slow in athena convert to parquet via glue columnar partition by date region compress less scanned ' },
    { id: 'scenarios-11', title: 'One key = 90% rows (skew)?', url: 'scenarios.html#scenarios-11', tags: 'one key 90 rows skew find via ui distribution then salt heavy key or broadcast if small table even distribution ' },
    { id: 'scenarios-12', title: 'GDPR PII masking/encryption?', url: 'scenarios.html#scenarios-12', tags: 'gdpr pii masking encryption find pii cols mask encrypt before store iam s3 encryption authorized only access ' },
    { id: 'scenarios-13', title: 'SCD2 in Glue w/ perf?', url: 'scenarios.html#scenarios-13', tags: 'scd2 in glue w perf diff source target expire old insert new parquet partitioning for query speed ' },
    { id: 'scenarios-14', title: 'SLA before 8AM, volume 2x?', url: 'scenarios.html#scenarios-14', tags: 'sla before 8am volume 2x cut shuffles partition incremental not full monitor scale cluster meet sla ' },
    { id: 'scenarios-15', title: 'Missing Python pkgs in prod?', url: 'scenarios.html#scenarios-15', tags: 'missing python pkgs in prod bundle deps with glue lambda spark test in dev before prod ' },
    { id: 'scenarios-16', title: 'API → S3 with throttling/retries/incremental?', url: 'scenarios.html#scenarios-16', tags: 'api s3 with throttling retries incremental retry w backoff on limits incremental via timestamps ids fewer calls ' },
    { id: 'scenarios-17', title: 'Inconsistent downstream results?', url: 'scenarios.html#scenarios-17', tags: 'inconsistent downstream results verify etl completion compare source target counts check partial loads add dq alerts ' },
    { id: 'scenarios-18', title: 'Monolith → micro-ETL?', url: 'scenarios.html#scenarios-18', tags: 'monolith micro etl split into small independent jobs easier maintain test debug isolated failures faster deploys ' },
    { id: 'scenarios-19', title: 'Training data structured+unstructured?', url: 'scenarios.html#scenarios-19', tags: 'training data structured unstructured collect all clean validate dedup standardize join on keys dq checks store in lake ' },
    { id: 'scenarios-20', title: 'AWS region outage?', url: 'scenarios.html#scenarios-20', tags: 'aws region outage cross region replication backups failover to secondary continuity min downtime ' },
    { id: 'scenarios-21', title: 'Fraud near-real-time alerts on AWS?', url: 'scenarios.html#scenarios-21', tags: 'fraud near real time alerts on aws kinesis capture lambda streaming rules sns email on fraud near real time ' },
    { id: 'scenarios-22', title: 'Daily job failed, no load?', url: 'scenarios.html#scenarios-22', tags: 'daily job failed no load cloudwatch airflow logs root cause rerun failed only validate notify stakeholders ' },
    { id: 'scenarios-23', title: 'TABLE1(0,1,1,2,3,NULL) TABLE2(1,2,3,NULL,NULL) joins?', url: 'scenarios.html#scenarios-23', tags: 'table1 0 1 1 2 3 null table2 1 2 3 null null joins cross 30 rows 6 5 left all t1 matches right all t2 matches full all both ' },
    { id: 'scenarios-24', title: 'Resume 40%→fail w/o redo?', url: 'scenarios.html#scenarios-24', tags: 'resume 40 fail w o redo checkpointing incremental store last good batch resume from there saves time cost ' },
    { id: 'scenarios-25', title: 'Large files without Spark?', url: 'scenarios.html#scenarios-25', tags: 'large files without spark chunked processing generators pandas chunks batches no full memory load ' },
    { id: 'scenarios-26', title: '100 stores API every 10min + exceptions?', url: 'scenarios.html#scenarios-26', tags: '100 stores api every 10min exceptions airflow lambda schedule per store task w retry log retry failures independently land in s3 ' },
    { id: 'scenarios-27', title: 'KPI: extract/clean/load?', url: 'scenarios.html#scenarios-27', tags: 'kpi extract clean load extract source api clean dedup nulls rules load redshift s3 accurate kpis ' },
    { id: 'scenarios-28', title: 'Block duplicates downstream?', url: 'scenarios.html#scenarios-28', tags: 'block duplicates downstream dedup on business pk keys dropduplicates dq checks only uniques downstream ' },
    { id: 'scenarios-29', title: 'New client, vendors, 15 changing metrics?', url: 'scenarios.html#scenarios-29', tags: 'new client vendors 15 changing metrics per vendor ingestion raw s3 standardized transforms metrics redshift airflow scheduled ' },
    { id: 'scenarios-30', title: 'E-commerce pipeline tables/cols?', url: 'scenarios.html#scenarios-30', tags: 'e commerce pipeline tables cols customers products orders order items payments shipments ids qty price status dates ' },
    { id: 'scenarios-31', title: 'Oracle→ES 36hrs?', url: 'scenarios.html#scenarios-31', tags: 'oracle es 36hrs incremental not full parallelize tune batch cut transforms monitor bottlenecks ' },
    { id: 'scenarios-32', title: 'Production issue faced?', url: 'scenarios.html#scenarios-32', tags: 'production issue faced duplicates from resent file caught via count validation removed via business keys added dq checks ' },
    { id: 'scenarios-33', title: 'Project SLA?', url: 'scenarios.html#scenarios-33', tags: 'project sla full etl before 8am daily for fresh reports monitored optimized spark alerts ' },
    { id: 'git-1', title: 'How did you use Git?', url: 'git.html#git-1', tags: 'how did you use git version control separate branches per dev local commits push to github pr review merge to main safe collaboration ' },
    { id: 'git-2', title: 'Git workflow?', url: 'git.html#git-2', tags: 'git workflow clone feature branch code commit push pr review merge main deploy ' },
    { id: 'git-3', title: 'What happens on git push?', url: 'git.html#git-3', tags: 'what happens on git push uploads local commits to remote github for team access then open pr for review merge ' },
    { id: 'git-4', title: 'Why branches?', url: 'git.html#git-4', tags: 'why branches isolate features fixes from main each dev own branch merge after review ' },
    { id: 'git-5', title: 'What is a Pull Request?', url: 'git.html#git-5', tags: 'what is a pull request request to merge branches enables review suggestions approval before merge quality gate ' },
    { id: 'git-6', title: 'Merge conflict? Resolve?', url: 'git.html#git-6', tags: 'merge conflict resolve two devs edit same lines git can t auto decide review both keep correct test commit resolved ' },
    { id: 'git-7', title: 'Most-used Git commands?', url: 'git.html#git-7', tags: 'most used git commands clone status add commit pull push branch checkout merge covers daily work ' },
    { id: 'git-8', title: 'Local behind remote?', url: 'git.html#git-8', tags: 'local behind remote git pull latest resolve conflicts test push updated ' },
    { id: 'git-9', title: 'Check changed files before commit?', url: 'git.html#git-9', tags: 'check changed files before commit git status for staged untracked git diff for exact lines ' },
    { id: 'git-10', title: 'Prod issue with Git?', url: 'git.html#git-10', tags: 'prod issue with git conflict on same file reviewed tested final merged told team to pull latest ' },
    { id: 'git-11', title: 'git fetch vs git pull?', url: 'git.html#git-11', tags: 'git fetch vs git pull fetch download only no merge pull download merge i use pull to stay updated ' },
    { id: 'git-12', title: 'Wrong file committed?', url: 'git.html#git-12', tags: 'wrong file committed local only undo recommit pushed revert or fix forward commit per team process ' },
    { id: 'cicd-1', title: 'What happens on Pull Request?', url: 'cicd.html#cicd-1', tags: 'what happens on pull request ci auto triggers code quality unit tests sql pyspark airflow dag validation pass approval merge to main ready to deploy ' },
    { id: 'cicd-2', title: 'Why Dev/QA/Prod?', url: 'cicd.html#cicd-2', tags: 'why dev qa prod test safely dev for changes qa for validation prod only approved code less prod risk better quality ' },
    { id: 'cicd-3', title: 'Unit tests fail in CI?', url: 'cicd.html#cicd-3', tags: 'unit tests fail in ci pipeline stops no further deploy dev checks logs fixes pushes pipeline re runs till green ' },
    { id: 'cicd-4', title: 'Why never secrets in Git?', url: 'cicd.html#cicd-4', tags: 'why never secrets in git exposed to unauthorized users use secrets manager parameter store key vault ' },
    { id: 'cicd-5', title: 'Benefit of IaC?', url: 'cicd.html#cicd-5', tags: 'benefit of iac infra as code terraform cdk automated consistent versioned faster deploys vs manual ' },
    { id: 'cicd-6', title: 'Same code to multiple envs?', url: 'cicd.html#cicd-6', tags: 'same code to multiple envs same code different configs buckets dbs roles secrets per dev qa prod safer ' },
    { id: 'cicd-7', title: 'Approval gates in Prod?', url: 'cicd.html#cicd-7', tags: 'approval gates in prod manual approval after verifying tests logs release notes blocks bad deploys ' },
    { id: 'cicd-8', title: 'Safe prod deployment?', url: 'cicd.html#cicd-8', tags: 'safe prod deployment all tests dq pass validated in dev qa rollback plan ready ' },
    { id: 'cicd-9', title: 'Monitor after deploy?', url: 'cicd.html#cicd-9', tags: 'monitor after deploy cloudwatch logs glue status airflow runs timings alerts source target counts ' },
    { id: 'cicd-10', title: 'Common CI/CD prod issues?', url: 'cicd.html#cicd-10', tags: 'common ci cd prod issues failed tests missing pkgs iam errors broken dags schema mismatch bad env vars logs fix redeploy ' },
    { id: 'cicd-11', title: 'Role of Git in CI/CD?', url: 'cicd.html#cicd-11', tags: 'role of git in ci cd version control branches prs merge to main auto triggers test deploy pipeline ' },
    { id: 'cicd-12', title: 'Reduce deployment failures?', url: 'cicd.html#cicd-12', tags: 'reduce deployment failures auto tests reviews env configs secret mgmt validate dev qa first stable releases ' }
  ];

  // ---------------------------------------------------------------------------
  //  UTILITIES
  // ---------------------------------------------------------------------------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function on(el, evt, fn, opts) {
    if (el) el.addEventListener(evt, fn, opts);
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  function storage(key, fallback) {
    try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }

  function storageSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* quota exceeded */ }
  }

  function escapeHtml(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  // ---------------------------------------------------------------------------
  //  1. DARK / LIGHT MODE TOGGLE
  // ---------------------------------------------------------------------------
  var ThemeManager = (function () {
    var btn;

    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      storageSet(STORAGE_KEYS.theme, theme);
      updateIcon(theme);
    }

    function updateIcon(theme) {
      if (!btn) return;
      var sun  = btn.querySelector('.icon-sun');
      var moon = btn.querySelector('.icon-moon');
      if (sun)  sun.style.display  = theme === 'dark' ? 'none' : 'inline';
      if (moon) moon.style.display = theme === 'dark' ? 'inline' : 'none';
    }

    function init() {
      btn = $('#theme-toggle');
      var current = storage(STORAGE_KEYS.theme, 'dark');
      apply(current);
      on(btn, 'click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.style.transition = 'background-color .3s, color .3s';
        apply(next);
      });
    }

    return { init: init, apply: apply };
  })();

  // ---------------------------------------------------------------------------
  //  2. SEARCH FUNCTIONALITY
  // ---------------------------------------------------------------------------
  var Search = (function () {
    var overlay, input, resultsContainer, isOpen = false;

    function open() {
      if (!overlay) return;
      overlay.classList.add('is-visible');
      overlay.classList.add('is-open');
      overlay.classList.add('active');
      isOpen = true;
      input.value = '';
      resultsContainer.innerHTML = '';
      input.focus();
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove('is-visible');
      overlay.classList.remove('is-open');
      overlay.classList.remove('active');
      isOpen = false;
      input.value = '';
      resultsContainer.innerHTML = '';
    }

    function query(term) {
      if (!term || term.length < 2) { resultsContainer.innerHTML = ''; return; }
      var lower = term.toLowerCase().replace(/[:\-_]+/g, ' ').replace(/\s+/g, ' ').trim();
      var tokens = lower.split(' ').filter(function (w) { return w.length > 1; });
      // stop-words that should not block a match (e.g. "components: glue can import from multiple sources")
      var stop = { can:1, from:1, the:1, and:1, for:1, with:1, into:1 };
      tokens = tokens.filter(function (w) { return !stop[w]; });
      if (!tokens.length) { resultsContainer.innerHTML = ''; return; }
      var matches = TOPICS.filter(function (t) {
        var hay = (t.title + ' ' + t.tags + ' ' + t.id.replace(/-/g, ' ')).toLowerCase();
        // every significant token must appear (AND); single-token falls back to substring
        for (var i = 0; i < tokens.length; i++) {
          if (hay.indexOf(tokens[i]) === -1) return false;
        }
        return true;
      });
      render(matches, term);
    }

    function highlight(text, term) {
      if (!term) return escapeHtml(text);
      var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return escapeHtml(text).replace(regex, '<mark>$1</mark>');
    }

    function render(matches, term) {
      if (!matches.length) {
        resultsContainer.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(term) + '"</div>';
        return;
      }
      var html = '<ul class="search-results-list">';
      matches.forEach(function (m) {
        html += '<li class="search-result-item">' +
                  '<a href="' + m.url + '">' + highlight(m.title, term) + '</a>' +
                  '<span class="search-result-tags">' + highlight(m.tags, term) + '</span>' +
                '</li>';
      });
      html += '</ul>';
      resultsContainer.innerHTML = html;

      // attach click handlers to navigate & close
      $$('.search-result-item a', resultsContainer).forEach(function (a) {
        on(a, 'click', function () { close(); });
      });
    }

    function init() {
      overlay   = $('#search-overlay');
      input     = $('#search-input');
      resultsContainer = $('#search-results');

      // open triggers
      $$('.search-trigger').forEach(function (el) { on(el, 'click', open); });

      // keyboard shortcut
      on(document, 'keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
        if (e.key === 'Escape' && isOpen) close();
      });

      // input
      on(input, 'input', debounce(function () { query(input.value.trim()); }, 200));

      // close on outside click
      on(overlay, 'click', function (e) { if (e.target === overlay) close(); });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  3. PROGRESS TRACKING
  // ---------------------------------------------------------------------------
  var Progress = (function () {
    var completed = [];

    function load()  { completed = storage(STORAGE_KEYS.completed, []); }
    function save()  { storageSet(STORAGE_KEYS.completed, completed); }

    function toggle(topicId) {
      var idx = completed.indexOf(topicId);
      if (idx === -1) { completed.push(topicId); }
      else            { completed.splice(idx, 1); }
      save();
      render();
      updateButtons();
    }

    function render() {
      var pct    = Math.round((completed.length / TOTAL_TOPICS) * 100);
      var bar    = $('#progress-bar-fill');
      var label  = $('#progress-label');
      if (bar)   bar.style.width = pct + '%';
      if (label) label.textContent = completed.length + ' / ' + TOTAL_TOPICS + ' Topics Completed';
    }

    function updateButtons() {
      $$('.topic-complete-btn').forEach(function (btn) {
        var id = btn.getAttribute('data-topic-id');
        if (completed.indexOf(id) !== -1) {
          btn.classList.add('completed');
          btn.textContent = 'Completed';
        } else {
          btn.classList.remove('completed');
          btn.textContent = 'Mark as Complete';
        }
      });
    }

    function init() {
      load();
      render();
      updateButtons();
      $$('.topic-complete-btn').forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });
    }

    return { init: init, isCompleted: function (id) { return completed.indexOf(id) !== -1; } };
  })();

  // ---------------------------------------------------------------------------
  //  4. BOOKMARKS
  // ---------------------------------------------------------------------------
  var Bookmarks = (function () {
    var bookmarked = [];

    function load() { bookmarked = storage(STORAGE_KEYS.bookmarks, []); }
    function save() { storageSet(STORAGE_KEYS.bookmarks, bookmarked); }

    function toggle(topicId) {
      var idx = bookmarked.indexOf(topicId);
      if (idx === -1) { bookmarked.push(topicId); }
      else            { bookmarked.splice(idx, 1); }
      save();
      updateButtons();
      renderSidebar();
    }

    function updateButtons() {
      $$('.bookmark-btn').forEach(function (btn) {
        var id = btn.getAttribute('data-topic-id');
        if (bookmarked.indexOf(id) !== -1) {
          btn.classList.add('bookmarked');
          btn.textContent = '★';
        } else {
          btn.classList.remove('bookmarked');
          btn.textContent = '☆';
        }
      });
    }

    function renderSidebar() {
      var panel = $('#bookmarks-list');
      if (!panel) return;
      if (!bookmarked.length) {
        panel.innerHTML = '<p class="bookmarks-empty">No bookmarks yet.</p>';
        return;
      }
      var html = '<ul class="bookmarks-items">';
      bookmarked.forEach(function (id) {
        var topic = TOPICS.find(function (t) { return t.id === id; });
        if (topic) {
          html += '<li class="bookmarks-item">' +
                    '<a href="' + topic.url + '">' + escapeHtml(topic.title) + '</a>' +
                    '<button class="bookmark-remove" data-topic-id="' + id + '">&times;</button>' +
                  '</li>';
        }
      });
      html += '</ul>';
      panel.innerHTML = html;

      $$('.bookmark-remove', panel).forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });
    }

    function init() {
      load();
      updateButtons();
      renderSidebar();

      $$('.bookmark-btn').forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });

      // toggle bookmarks panel visibility
      var panel = $('#bookmarks-panel');
      var toggleBtn = $('#bookmarks-toggle');
      if (toggleBtn && panel) {
        on(toggleBtn, 'click', function () { panel.classList.toggle('active'); });
      }
      // close button inside panel
      $$('.bookmarks-panel__close').forEach(function (btn) {
        on(btn, 'click', function () { if (panel) panel.classList.remove('active'); });
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  5. CODE BLOCK COPY BUTTON
  // ---------------------------------------------------------------------------
  var CodeCopy = (function () {
    function flash(btn, original) {
      var txt = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.textContent = original || 'Copy';
        btn.classList.remove('copied');
        btn.classList.remove('is-copied');
      }, 2000);
    }
    function copyText(text, btn, original) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(btn, original); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        flash(btn, original);
      }
    }
    function addCopyButtons() {
      // 1) Wire existing header buttons (.code-block__copy) - keep them away from code in header
      $$('.code-block__copy').forEach(function (btn) {
        if (btn.dataset.bound) return;
        btn.dataset.bound = '1';
        var block = btn.closest('.code-block');
        var code = block ? block.querySelector('pre > code, pre code') : null;
        if (!code) return;
        var original = btn.textContent.trim() || 'Copy';
        on(btn, 'click', function () { copyText(code.textContent, btn, original); });
      });
      // 2) Fallback: blocks without header button - create inside <pre> but padded away from code via CSS
      $$('pre > code').forEach(function (code) {
        var pre = code.parentElement;
        var block = pre.closest('.code-block');
        if (block && block.querySelector('.code-block__copy')) return; // header already handles it
        if (pre.querySelector('.copy-btn')) return;
        pre.style.position = 'relative';
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code');
        on(btn, 'click', function () { copyText(code.textContent, btn, 'Copy'); });
        pre.appendChild(btn);
      });
    }
    function init() { addCopyButtons(); }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  6. MOBILE HAMBURGER MENU
  // ---------------------------------------------------------------------------
  var MobileMenu = (function () {
    var burger, overlay, nav, isOpen = false;

    function open() {
      if (burger) burger.classList.add('is-active');
      if (overlay) overlay.classList.add('is-visible');
      if (nav) {
        nav.classList.add('is-open');
        if (nav.style.transform) nav.style.transform = '';
      }
      document.body.style.overflow = 'hidden';
      isOpen = true;
    }

    function close() {
      if (burger) burger.classList.remove('is-active');
      if (overlay) overlay.classList.remove('is-visible');
      if (nav) nav.classList.remove('is-open');
      document.body.style.overflow = '';
      isOpen = false;
    }

    function init() {
      burger  = $('#hamburger');
      overlay = $('#mobile-overlay');
      nav     = $('#mobile-nav');

      if (burger) on(burger, 'click', function () { isOpen ? close() : open(); });
      if (overlay) on(overlay, 'click', close);

      // close on link click
      if (nav) {
        $$('a', nav).forEach(function (a) {
          on(a, 'click', close);
        });
      }

      // close on Escape
      on(document, 'keydown', function (e) {
        if (e.key === 'Escape' && isOpen) close();
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7. SIDEBAR TOGGLE
  // ---------------------------------------------------------------------------
  var Sidebar = (function () {
    var sidebar, toggleBtn;

    function setState(open) {
      if (!sidebar) return;
      if (open) { sidebar.classList.add('is-open'); }
      else      { sidebar.classList.remove('is-open'); }
      storageSet(STORAGE_KEYS.sidebar, open);
    }

    function init() {
      sidebar  = $('#sidebar');
      toggleBtn = $('#sidebar-toggle');
      var stored = storage(STORAGE_KEYS.sidebar, true);
      setState(stored);

      if (toggleBtn) {
        on(toggleBtn, 'click', function () {
          var isOpen = sidebar.classList.contains('is-open');
          setState(!isOpen);
        });
      }
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7b. SIDEBAR COLLAPSE (heading icon toggle)
  // ---------------------------------------------------------------------------
  var SidebarCollapse = (function () {
    function init() {
      $$('.sidebar__heading').forEach(function (heading) {
        on(heading, 'click', function () {
          var section = heading.closest('.sidebar__section');
          if (section) section.classList.toggle('is-collapsed');
        });
      });
      var currentFile = location.pathname.split('/').pop() || 'index.html';
      $$('.sidebar__section').forEach(function (section) {
        var links = $$('a', section);
        for (var i = 0; i < links.length; i++) {
          var href = links[i].getAttribute('href') || '';
          var filePart = href.split('#')[0].split('/').pop();
          if (filePart === currentFile) { section.classList.remove('is-collapsed'); break; }
        }
      });
    }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7c. SIDEBAR SMOOTH SCROLL (prevent refresh on same-page anchors)
  // ---------------------------------------------------------------------------
  var SidebarSmoothScroll = (function () {
    function init() {
      var currentFile = location.pathname.split('/').pop() || 'index.html';
      $$('.sidebar__link').forEach(function (link) {
        on(link, 'click', function (e) {
          var href = link.getAttribute('href');
          if (!href || href.indexOf('#') === -1) return;
          var parts = href.split('#');
          var filePart = parts[0];
          var hash = parts[1];
          if (!hash) return;
          var targetFile = filePart ? filePart.split('/').pop() : currentFile;
          if (!targetFile) targetFile = currentFile;
          // same-page anchor: prevent full reload, smooth scroll with fixed header offset
          if (targetFile === currentFile) {
            e.preventDefault();
            var target = document.getElementById(hash);
            if (target) {
              var navHeight = 64;
              try { var cs = getComputedStyle(document.documentElement); var nh = parseInt(cs.getPropertyValue('--nav-height')); if (!isNaN(nh)) navHeight = nh; } catch(e2) {}
              var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
              window.scrollTo({ top: top, behavior: 'smooth' });
              history.pushState(null, '', '#' + hash);
            }
          }
          // cross-page: let browser navigate normally; target page's CSS scroll-margin will handle offset
        });
      });
      // handle initial hash on load with offset (for direct # interview-prep links)
      if (location.hash) {
        var hash = location.hash.substring(1);
        var target = document.getElementById(hash);
        if (target) {
          setTimeout(function () {
            var navHeight = 64;
            try { var cs = getComputedStyle(document.documentElement); var nh = parseInt(cs.getPropertyValue('--nav-height')); if (!isNaN(nh)) navHeight = nh; } catch(e2) {}
            var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({ top: top, behavior: 'auto' });
          }, 100);
        }
      }
    }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  8. EXPANDABLE SECTIONS
  // ---------------------------------------------------------------------------
  var Expandable = (function () {
    var states = {};

    function load() { states = storage(STORAGE_KEYS.expandable, {}); }
    function save() { storageSet(STORAGE_KEYS.expandable, states); }

    function toggleSection(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var content = el.querySelector('.expandable-content');
      var icon    = el.querySelector('.expandable-icon');
      if (!content) return;

      var expanded = states[id] === true; // default collapsed

      if (expanded) {
        // collapse
        content.style.maxHeight = content.scrollHeight + 'px';
        requestAnimationFrame(function () {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          if (icon) icon.style.transform = 'rotate(-90deg)';
        });
        states[id] = false;
      } else {
        // expand
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0';
        requestAnimationFrame(function () {
          content.style.maxHeight = content.scrollHeight + 'px';
          if (icon) icon.style.transform = 'rotate(0deg)';
        });
        states[id] = true;
        // remove max-height after transition so content can resize
        setTimeout(function () { content.style.maxHeight = 'none'; content.style.overflow = ''; }, 400);
      }
      save();
    }

    function init() {
      load();
      $$('.expandable-section').forEach(function (section) {
        var id    = section.id;
        var state = states[id];
        var content = section.querySelector('.expandable-content');
        var icon    = section.querySelector('.expandable-icon');
        if (!content) return;

        if (state === true) {
          content.style.maxHeight = 'none';
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          if (icon) icon.style.transform = 'rotate(-90deg)';
        }

        var header = section.querySelector('.expandable-header');
        if (header) on(header, 'click', function () { toggleSection(id); });
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  9. SCROLL SPY
  // ---------------------------------------------------------------------------
  var ScrollSpy = (function () {
    var sections = [];
    var navLinks = [];

    function update() {
      var scrollY = window.scrollY + 120;
      var current = null;

      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollY) current = sec;
      });

      var currentFile = location.pathname.split('/').pop() || 'index.html';
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        link.classList.remove('is-active');
        if (!current) return;
        var href = link.getAttribute('href') || '';
        if (href.indexOf('#') === -1) return;
        var parts = href.split('#');
        var filePart = parts[0];
        var hash = parts[1];
        var linkFile = filePart ? filePart.split('/').pop() : currentFile;
        if (!linkFile) linkFile = currentFile;
        if (linkFile === currentFile && hash === current.id) {
          link.classList.add('active');
          link.classList.add('is-active');
        }
      });
    }

    function init() {
      sections = $$('section[id], .topic-section[id], h2[id], h3[id]');
      navLinks = $$('.sidebar-nav a[href*="#"], .sidebar a[href*="#"]');
      if (!sections.length || !navLinks.length) return;

      on(window, 'scroll', debounce(update, 50), { passive: true });
      update();
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  10. INTERACTIVE DIAGRAM CLICK
  // ---------------------------------------------------------------------------
  var DiagramClick = (function () {
    function init() {
      $$('.diagram-component').forEach(function (comp) {
        on(comp, 'click', function () {
          var panelId = comp.getAttribute('data-explain');
          var panel   = panelId ? document.getElementById(panelId) : null;
          // close all panels first
          $$('.diagram-explanation').forEach(function (p) { p.classList.remove('active'); });
          if (panel) {
            panel.classList.add('active');
            comp.classList.add('selected');
          }
        });
      });

      // close panel on close button
      $$('.diagram-close').forEach(function (btn) {
        on(btn, 'click', function () {
          var panel = btn.closest('.diagram-explanation');
          if (panel) panel.classList.remove('active');
          $$('.diagram-component.selected').forEach(function (c) { c.classList.remove('selected'); });
        });
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  11. SCENARIO REVEAL
  // ---------------------------------------------------------------------------
  var ScenarioReveal = (function () {
    function init() {
      $$('.scenario-steps').forEach(function (container) {
        var steps   = $$('.scenario-step', container);
        var btn     = container.querySelector('.scenario-next-btn');
        var current = 0;

        // hide all steps initially (CSS also hides, but ensure)
        steps.forEach(function (s) { s.style.display = 'none'; s.classList.remove('is-visible'); });

        if (!steps.length) return;
        // show first step - use both inline block and is-visible for CSS compatibility
        steps[0].style.display = 'block';
        steps[0].classList.add('is-visible');

        if (btn) {
          on(btn, 'click', function () {
            current++;
            if (current >= steps.length) {
              btn.style.display = 'none';
              return;
            }
            steps[current].style.display = 'block';
            steps[current].classList.add('is-visible');
            // update button text on last step
            if (current === steps.length - 1) btn.textContent = 'All Steps Revealed';
          });
        }
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  12. INTERSECTION OBSERVER ANIMATIONS
  // ---------------------------------------------------------------------------
  var Animations = (function () {
    function init() {
      if (!('IntersectionObserver' in window)) {
        // fallback: show everything immediately
        $$('.fade-in, .slide-in, .stagger-item').forEach(function (el) {
          el.classList.add('visible');
        });
        return;
      }

      // Staggered cards
      var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var cards = $$('.stagger-item', entry.target);
            cards.forEach(function (card, i) {
              setTimeout(function () { card.classList.add('visible'); }, i * 80);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      $$('.stagger-container').forEach(function (container) {
        staggerObserver.observe(container);
      });

      // Simple fade-in
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      $$('.fade-in, .slide-in').forEach(function (el) {
        fadeObserver.observe(el);
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  INIT ALL
  // ---------------------------------------------------------------------------
  function initAll() {
    ThemeManager.init();
    Search.init();
    Progress.init();
    Bookmarks.init();
    CodeCopy.init();
    MobileMenu.init();
    Sidebar.init();
    SidebarCollapse.init();
    SidebarSmoothScroll.init();
    Expandable.init();
    ScrollSpy.init();
    DiagramClick.init();
    ScenarioReveal.init();
    Animations.init();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
