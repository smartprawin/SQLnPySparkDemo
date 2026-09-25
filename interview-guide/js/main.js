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
    { id: 'python-1', title: 'List vs Tuple vs Set vs Dictionary', url: 'python.html#python-1', tags: 'list vs tuple vs set vs dictionary list tuple set and dictionary are the four built in collection data types in python lists are mutable and ordered whereas tuples are immutable and ordered sets store only unique elements and provide very fast membership testing while dictionaries store data as key ' },
    { id: 'python-2', title: 'What is List Comprehension and Dictionary Comprehension?', url: 'python.html#python-2', tags: 'what is list comprehension and dictionary comprehension list comprehension and dictionary comprehension provide a concise way to create lists and dictionaries in a single line of code they improve readability and are generally faster than traditional loops list comprehension returns a list while dic' },
    { id: 'python-3', title: 'What is Inheritance and its types?', url: 'python.html#python-3', tags: 'what is inheritance and its types inheritance is an oop concept that allows one class to inherit properties and methods from another class promoting code reusability python supports single multiple multilevel hierarchical and hybrid inheritance it helps reduce code duplication and makes applications' },
    { id: 'python-4', title: 'What is a Lambda Function?', url: 'python.html#python-4', tags: 'what is a lambda function a lambda function is an anonymous single line function used for simple operations without defining a regular function it is commonly used with functions like map filter and reduce lambda functions make the code shorter and more readable for small transformations i use them ' },
    { id: 'python-5', title: 'What are Decorators?', url: 'python.html#python-5', tags: 'what are decorators decorators are functions that extend or modify the behavior of another function without changing its source code they are implemented using the symbol decorators are commonly used for logging authentication caching and execution time measurement in data engineering projects decor' },
    { id: 'python-6', title: 'What is Shallow Copy vs Deep Copy?', url: 'python.html#python-6', tags: 'what is shallow copy vs deep copy a shallow copy creates a new object but shares references to nested objects so changes in nested elements affect both copies a deep copy creates a completely independent copy of both the object and all nested objects python provides copy for shallow copy and deepcop' },
    { id: 'python-7', title: 'What are *args and **kwargs?', url: 'python.html#python-7', tags: 'what are args and kwargs args allows a function to accept any number of positional arguments while kwargs allows any number of keyword arguments internally args is stored as a tuple and kwargs as a dictionary they make functions flexible and reusable i use them when the number of input parameters is' },
    { id: 'python-8', title: 'What is a Constructor? Explain __init__()', url: 'python.html#python-8', tags: 'what is a constructor explain init a constructor is a special method that is automatically called when an object is created in python the constructor is the init method it is mainly used to initialize object attributes with default or user provided values this ensures every object starts with the re' },
    { id: 'python-9', title: 'What are Generators?', url: 'python.html#python-9', tags: 'what are generators generators are functions that produce values one at a time using the yield keyword instead of returning all values at once they are memory efficient because they generate values only when needed this makes them ideal for processing large files or streaming data in data engineerin' },
    { id: 'python-10', title: 'What are the OOP Concepts?', url: 'python.html#python-10', tags: 'what are the oop concepts the four main oop concepts are encapsulation abstraction inheritance and polymorphism encapsulation protects data by restricting direct access abstraction hides implementation details inheritance enables code reuse and polymorphism allows the same interface to have multiple' },
    { id: 'python-11', title: 'What is Multi-threading vs Multi-processing?', url: 'python.html#python-11', tags: 'what is multi threading vs multi processing multithreading executes multiple threads within the same process and is best suited for i o bound tasks like api calls and file operations multiprocessing creates separate processes with independent memory and is ideal for cpu intensive tasks unlike multit' },
    { id: 'python-12', title: 'Do you know how Garbage Collection works in Python?', url: 'python.html#python-12', tags: 'do you know how garbage collection works in python yes python automatically manages memory using reference counting and a garbage collector when an object s reference count becomes zero its memory is released immediately python also detects and removes circular references using the gc module this au' },
    { id: 'pandas-1', title: 'What is a Pandas DataFrame vs a Series? What are the differences?', url: 'pandas.html#pandas-1', tags: 'what is a pandas dataframe vs a series what are the differences a series is a one dimensional data structure that stores a single column of data with an index while a dataframe is a two dimensional table with rows and multiple columns a dataframe is essentially a collection of series sharing the sam' },
    { id: 'pandas-2', title: 'How do you read different file formats in Pandas (CSV, JSON, Parquet, Excel)?', url: 'pandas.html#pandas-2', tags: 'how do you read different file formats in pandas csv json parquet excel pandas provides dedicated functions to read different file formats i use read csv for csv files read json for json read parquet for parquet files and read excel for excel files depending on the source system i choose the appropr' },
    { id: 'pandas-3', title: 'What is the difference between Merge, Join and Concat in Pandas?', url: 'pandas.html#pandas-3', tags: 'what is the difference between merge join and concat in pandas merge combines dataframes based on common columns similar to sql joins join is mainly used to combine dataframes using indexes concat simply appends dataframes either row wise or column wise without matching keys in etl projects i mostly' },
    { id: 'pandas-4', title: 'What is the difference between LOC vs ILOC?', url: 'pandas.html#pandas-4', tags: 'what is the difference between loc vs iloc loc accesses data using row and column labels whereas iloc accesses data using integer positions i use loc when filtering based on column names or indexes and iloc when selecting rows by position both are useful during data validation and exploratory analys' },
    { id: 'pandas-5', title: 'How do you remove duplicate rows from a DataFrame?', url: 'pandas.html#pandas-5', tags: 'how do you remove duplicate rows from a dataframe i use the drop duplicates function to remove duplicate rows from a dataframe if needed i specify particular columns using the subset parameter to identify duplicates in etl pipelines removing duplicates is an important data quality step before loadin' },
    { id: 'pandas-6', title: 'How to explode a nested JSON using Pandas?', url: 'pandas.html#pandas-6', tags: 'how to explode a nested json using pandas for nested json data i first flatten the json using json normalize if a column contains a list of values i use the explode function to convert each list element into a separate row this makes the data easier to transform and load into relational tables ' },
    { id: 'pandas-7', title: 'What is the difference between Pandas vs PySpark?', url: 'pandas.html#pandas-7', tags: 'what is the difference between pandas vs pyspark pandas processes data on a single machine and is best for small to medium datasets that fit into memory pyspark is built for distributed computing and can process large scale data across multiple cluster nodes in my projects i use pandas for local ana' },
    { id: 'sql-1', title: 'What is Normalization and its types (1NF, 2NF, 3NF)? What are the advantages and disadvantages?', url: 'sql.html#sql-1', tags: 'what is normalization and its types 1nf 2nf 3nf what are the advantages and disadvantages normalization is the process of organizing data to reduce redundancy and improve data integrity 1nf removes repeating groups 2nf removes partial dependency and 3nf removes transitive dependency the main advanta' },
    { id: 'sql-2', title: 'What is De-normalization? When and why would you use it?', url: 'sql.html#sql-2', tags: 'what is de normalization when and why would you use it denormalization is the process of combining tables to reduce joins and improve query performance it introduces some data redundancy but makes data retrieval much faster i mainly use it in reporting or data warehouse scenarios where read performa' },
    { id: 'sql-3', title: 'What are Window Functions in SQL? Give examples of ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER.', url: 'sql.html#sql-3', tags: 'what are window functions in sql give examples of row number rank dense rank lag lead sum over window functions perform calculations across a set of rows without grouping the data row number gives unique row numbers rank skips ranks after ties dense rank doesn t skip ranks lag and lead access previo' },
    { id: 'sql-4', title: 'What are all the types of JOINs in SQL?', url: 'sql.html#sql-4', tags: 'what are all the types of joins in sql sql supports inner join left join right join full outer join cross join and self join inner join returns matching records left and right return all records from one side full returns all records from both tables cross creates a cartesian product and self join j' },
    { id: 'sql-5', title: 'What is a CTE (Common Table Expression)? Why do we use it? What are its advantages?', url: 'sql.html#sql-5', tags: 'what is a cte common table expression why do we use it what are its advantages a cte is a temporary result set created using the with clause it improves query readability simplifies complex sql and avoids repeating the same subquery multiple times i often use ctes for multi step transformations and ' },
    { id: 'sql-6', title: 'What is Indexing in SQL? What are types of indexes (Clustered and Non-Clustered)?', url: 'sql.html#sql-6', tags: 'what is indexing in sql what are types of indexes clustered and non clustered an index improves query performance by allowing sql to find data quickly instead of scanning the entire table a clustered index stores data physically in sorted order so only one can exist per table a non clustered index s' },
    { id: 'sql-7', title: 'What is a Stored Procedure? How is it advantageous over normal querying?', url: 'sql.html#sql-7', tags: 'what is a stored procedure how is it advantageous over normal querying a stored procedure is a precompiled collection of sql statements stored in the database it improves performance because the execution plan is reused and reduces network traffic it also provides better security and makes complex b' },
    { id: 'sql-8', title: 'WHERE clause vs HAVING clause (4 differences)', url: 'sql.html#sql-8', tags: 'where clause vs having clause 4 differences where filters individual rows before grouping whereas having filters grouped or aggregated data after group by where cannot use aggregate functions but having can where executes earlier than having making it generally faster ' },
    { id: 'sql-9', title: 'What is the order of execution in SQL?', url: 'sql.html#sql-9', tags: 'what is the order of execution in sql the logical execution order is from where group by having select order by sql first identifies the source table filters rows groups data filters groups selects required columns and finally sorts the result understanding this order helps in writing optimized quer' },
    { id: 'sql-10', title: 'What is the difference between Primary Key, Foreign Key, Unique Key, and Composite Key?', url: 'sql.html#sql-10', tags: 'what is the difference between primary key foreign key unique key and composite key a primary key uniquely identifies each row and cannot contain null values a foreign key creates a relationship between two tables a unique key also ensures uniqueness but allows one null value in most databases a com' },
    { id: 'sql-11', title: 'What is DELETE vs DROP vs TRUNCATE? Is TRUNCATE DDL or DML?', url: 'sql.html#sql-11', tags: 'what is delete vs drop vs truncate is truncate ddl or dml delete removes selected rows and can be rolled back truncate removes all rows quickly without logging individual row deletions and is a ddl command drop deletes the entire table structure along with its data truncate is faster than delete bec' },
    { id: 'sql-12', title: 'What are the optimization techniques in SQL?', url: 'sql.html#sql-12', tags: 'what are the optimization techniques in sql i optimize sql queries by creating proper indexes selecting only required columns instead of using select filtering data early with the where clause and avoiding unnecessary subqueries or functions on indexed columns i also analyze execution plans use join' },
    { id: 'pyspark-1', title: 'Explain Spark Architecture in detail.', url: 'pyspark.html#pyspark-1', tags: 'explain spark architecture in detail spark follows a master worker architecture when a spark job starts the driver creates the execution plan and coordinates the job the cluster manager allocates resources and executors on worker nodes execute the tasks and store data in memory this distributed arch' },
    { id: 'pyspark-2', title: 'What happens after a spark-submit?', url: 'pyspark.html#pyspark-2', tags: 'what happens after a spark submit after spark submit the driver program starts and requests resources from the cluster manager executors are launched on worker nodes and the driver builds a dag directed acyclic graph based on the transformations when an action is triggered spark schedules tasks and ' },
    { id: 'pyspark-3', title: 'RDD vs DataFrame vs Dataset (4 differences with examples)', url: 'pyspark.html#pyspark-3', tags: 'rdd vs dataframe vs dataset 4 differences with examples rdd is the low level distributed collection with full control but no optimization dataframe is a structured table with schema and uses the catalyst optimizer for better performance dataset combines dataframe optimization with compile time type ' },
    { id: 'pyspark-4', title: 'What is Lazy Evaluation in Spark? Why is it important?', url: 'pyspark.html#pyspark-4', tags: 'what is lazy evaluation in spark why is it important spark doesn t execute transformations immediately instead it records them in a dag and executes only when an action like show count or collect is called this is called lazy evaluation it helps spark optimize execution reduce unnecessary computatio' },
    { id: 'pyspark-5', title: 'Narrow Transformation vs Wide Transformation (4 differences with examples)', url: 'pyspark.html#pyspark-5', tags: 'narrow transformation vs wide transformation 4 differences with examples narrow transformations process data within the same partition and don t require data movement such as map filter and flatmap wide transformations require shuffling data across partitions such as groupby join and reducebykey nar' },
    { id: 'pyspark-6', title: 'What is a Sort-Merge Join vs Shuffle-Hash Join?', url: 'pyspark.html#pyspark-6', tags: 'what is a sort merge join vs shuffle hash join sort merge join first shuffles and sorts both datasets before joining them it s best for large datasets and is spark s default join strategy shuffle hash join also shuffles data but builds a hash table on the smaller side instead of sorting it is faster' },
    { id: 'pyspark-7', title: 'Cache vs Persist (4 differences and when to use each)', url: 'pyspark.html#pyspark-7', tags: 'cache vs persist 4 differences and when to use each both cache and persist store data for reuse cache stores data only in memory using the default storage level persist allows different storage options such as memory disk or both i use cache for frequently accessed small datasets and persist when th' },
    { id: 'pyspark-8', title: 'Repartition vs Coalesce (4 differences and when to use each)', url: 'pyspark.html#pyspark-8', tags: 'repartition vs coalesce 4 differences and when to use each repartition increases or decreases partitions and performs a full shuffle making it suitable for balancing data before joins coalesce mainly reduces partitions without a full shuffle making it faster i use repartition for better parallelism ' },
    { id: 'pyspark-9', title: 'What is Data Skewness? What causes it and how do you handle it?', url: 'pyspark.html#pyspark-9', tags: 'what is data skewness what causes it and how do you handle it data skewness occurs when a few partitions contain much more data than others causing some executors to take longer it is usually caused by uneven key distribution during joins or aggregations i handle it using techniques like salting bro' },
    { id: 'pyspark-10', title: 'What is Salting? Why and how do you implement it in Spark? Provide code example.', url: 'pyspark.html#pyspark-10', tags: 'what is salting why and how do you implement it in spark provide code example salting is a technique used to handle data skew by adding a random value to skewed keys distributing records across multiple partitions this prevents one executor from processing all records for the same key and improves j' },
    { id: 'pyspark-11', title: 'What are the optimization techniques to improve Spark performance?', url: 'pyspark.html#pyspark-11', tags: 'what are the optimization techniques to improve spark performance i improve spark performance by using partitioning broadcast joins caching avoiding unnecessary shuffle operations selecting only required columns and using efficient file formats like parquet i also tune executor memory optimize parti' },
    { id: 'pyspark-12', title: 'What is Broadcast Join vs Salting?', url: 'pyspark.html#pyspark-12', tags: 'what is broadcast join vs salting broadcast join is used when one table is small spark sends the small table to all executors avoiding expensive shuffles salting is used to solve data skew by distributing heavily repeated keys across multiple partitions i use broadcast for small lookup tables and sa' },
    { id: 'aws-1', title: 'What is Amazon S3? What are the different S3 Storage Classes?', url: 'aws.html#aws-1', tags: 'what is amazon s3 what are the different s3 storage classes amazon s3 is an object storage service used to store large amounts of structured and unstructured data with high durability and scalability common storage classes include standard intelligent tiering standard ia one zone ia glacier instant ' },
    { id: 'aws-2', title: 'What is AWS Glue? What are the components and key features of it?', url: 'aws.html#aws-2', tags: 'what is aws glue what are the components and key features of it aws glue is a serverless etl service used to discover transform and load data its main components are the data catalog crawler etl jobs triggers workflows and job bookmarks key features include automatic schema discovery serverless exec' },
    { id: 'aws-3', title: 'What are AWS Glue Dynamic Frames? How do they differ from Spark DataFrames?', url: 'aws.html#aws-3', tags: 'what are aws glue dynamic frames how do they differ from spark dataframes dynamic frames are aws glue s data structure designed for semi structured and inconsistent data unlike spark dataframes they can automatically handle schema variations and missing fields without failing when i need spark sql f' },
    { id: 'aws-4', title: 'What is the difference between Data Warehouse vs Data Lake vs Data Lakehouse?', url: 'aws.html#aws-4', tags: 'what is the difference between data warehouse vs data lake vs data lakehouse a data warehouse stores structured curated data for reporting and bi a data lake stores raw structured and unstructured data at low cost a data lakehouse combines the flexibility of a data lake with the reliability and acid' },
    { id: 'aws-5', title: 'What are Glue Job Bookmarks? How do they enable incremental loads?', url: 'aws.html#aws-5', tags: 'what are glue job bookmarks how do they enable incremental loads glue job bookmarks track the data that has already been processed in previous job runs during the next execution glue processes only new or modified records instead of the entire dataset this enables efficient incremental loading reduc' },
    { id: 'aws-6', title: 'What is the difference between Glue vs EMR vs Lambda? When do you use each?', url: 'aws.html#aws-6', tags: 'what is the difference between glue vs emr vs lambda when do you use each glue is a serverless etl service for data integration emr is a managed hadoop and spark cluster used for large scale big data processing with more control lambda is a serverless compute service for short eventdriven tasks i us' },
    { id: 'aws-7', title: 'How do you deploy your Glue code to higher environments (CI/CD)?', url: 'aws.html#aws-7', tags: 'how do you deploy your glue code to higher environments ci cd in my projects glue scripts are stored in git for version control a ci cd pipeline using services like codepipeline codebuild or jenkins validates and deploys the code to dev qa and production environments configuration values such as buc' },
    { id: 'aws-8', title: 'What is AWS Lambda? What are its key features? What are its limitations?', url: 'aws.html#aws-8', tags: 'what is aws lambda what are its key features what are its limitations aws lambda is a serverless compute service that runs code in response to events without managing servers key features include automatic scaling event driven execution and pay per use pricing its limitations include a maximum execu' },
    { id: 'aws-9', title: 'What are the advantages of Athena?', url: 'aws.html#aws-9', tags: 'what are the advantages of athena amazon athena is a serverless query service that allows sql queries directly on data stored in s3 it requires no infrastructure management integrates with the glue data catalog supports multiple file formats like parquet and orc and charges only for the amount of da' },
    { id: 'aws-10', title: 'Explain the architecture of Amazon Redshift.', url: 'aws.html#aws-10', tags: 'explain the architecture of amazon redshift amazon redshift follows a massively parallel processing mpp architecture it consists of a leader node which receives sql queries and creates execution plans and multiple compute nodes which process data in parallel data is stored in a columnar format enabl' },
    { id: 'aws-11', title: 'Difference between Athena vs Redshift vs Redshift Spectrum.', url: 'aws.html#aws-11', tags: 'difference between athena vs redshift vs redshift spectrum athena queries data directly from s3 without storing it redshift is a fully managed data warehouse optimized for high performance analytics on stored data redshift spectrum allows redshift to query external data stored in s3 without loading ' },
    { id: 'aws-12', title: 'How do you optimize Athena query performance?', url: 'aws.html#aws-12', tags: 'how do you optimize athena query performance i optimize athena by storing data in parquet or orc format partitioning large datasets compressing files selecting only required columns instead of select and avoiding scanning unnecessary partitions these techniques reduce the amount of data scanned impr' },
    { id: 'aws-13', title: 'What are the distribution styles in Redshift? What is the syntax for Distribution Key?', url: 'aws.html#aws-13', tags: 'what are the distribution styles in redshift what is the syntax for distribution key redshift supports auto even key and all distribution styles even distributes rows equally key distributes rows based on a selected column all copies small tables to every node and auto lets redshift choose the best ' },
    { id: 'aws-14', title: 'Dist Key vs Sort Key in Redshift (4 differences)', url: 'aws.html#aws-14', tags: 'dist key vs sort key in redshift 4 differences dist key determines how data is distributed across compute nodes while sort key determines how data is physically sorted within each node dist key improves join performance by minimizing data movement whereas sort key improves query performance by reduc' },
    { id: 'aws-15', title: 'What is Amazon CloudWatch? What is it used for?', url: 'aws.html#aws-15', tags: 'what is amazon cloudwatch what is it used for amazon cloudwatch is a monitoring service for aws resources and applications it collects metrics logs and events allowing us to monitor system health and performance i use cloudwatch to monitor glue jobs lambda executions ec2 instances and to create alar' },
    { id: 'aws-16', title: 'What is AWS DMS (Database Migration Service)? How does it capture updates using CDC?', url: 'aws.html#aws-16', tags: 'what is aws dms database migration service how does it capture updates using cdc aws dms is a managed service used to migrate data between databases with minimal downtime it supports both full data load and change data capture cdc cdc continuously reads database transaction logs to capture inserts u' },
    { id: 'aws-17', title: 'What are SCD Types? Explain SCD Type 2 with an example.', url: 'aws.html#aws-17', tags: 'what are scd types explain scd type 2 with an example slowly changing dimensions scd are techniques used to manage changes in dimension data common types are type 1 type 2 and type 3 scd type 2 preserves history by creating a new record whenever a value changes while marking the old record as inacti' },
    { id: 'airflow-1', title: 'What is a DAG in Apache Airflow? How does it work?', url: 'airflow.html#airflow-1', tags: 'what is a dag in apache airflow how does it work a dag directed acyclic graph is a workflow that defines the sequence of tasks in apache airflow each task represents a step in the pipeline and dependencies decide the execution order airflow schedules the dag executes the tasks and monitors their sta' },
    { id: 'airflow-2', title: 'What is XCom (Cross-Communication) in Airflow? How do you use xcom_push and xcom_pull?', url: 'airflow.html#airflow-2', tags: 'what is xcom cross communication in airflow how do you use xcom push and xcom pull xcom cross communication is used to share small amounts of data between airflow tasks xcom push stores a value from one task and xcom pull retrieves that value in another task i use xcom to pass file names ids or stat' },
    { id: 'airflow-3', title: 'What are the different ways to trigger a DAG in Airflow?', url: 'airflow.html#airflow-3', tags: 'what are the different ways to trigger a dag in airflow a dag can be triggered in multiple ways it can run on a schedule using cron expressions be triggered manually from the airflow ui through the airflow cli using the rest api or by another dag using triggerdagrunoperator the method depends on the' },
    { id: 'airflow-4', title: 'How does Airflow handle task retries?', url: 'airflow.html#airflow-4', tags: 'how does airflow handle task retries if a task fails airflow can retry it automatically based on the retry configuration we define the number of retries and the retry delay in the dag if the task still fails after all retries it is marked as failed and alerts can be sent ' },
    { id: 'airflow-5', title: 'Difference between Airflow vs Step Functions', url: 'airflow.html#airflow-5', tags: 'difference between airflow vs step functions apache airflow is mainly used for scheduling and orchestrating etl and data pipelines aws step functions are used to coordinate aws services like lambda glue and ecs in serverless workflows i use airflow for complex data workflows and step functions for a' },
    { id: 'airflow-6', title: 'How do you define dependencies in Airflow DAGs?', url: 'airflow.html#airflow-6', tags: 'how do you define dependencies in airflow dags dependencies define the order in which tasks run in airflow i use or operators or methods like set upstream and set downstream this ensures that one task starts only after the previous task completes successfully task1 task2 task3 or task2 set upstream ' },
    { id: 'azure-1', title: 'Why did you use Azure Data Factory (ADF) in the project?', url: 'azure.html#azure-1', tags: 'why did you use azure data factory adf in the project we used azure data factory to automate and orchestrate our etl pipeline it helped us move data from different source systems to azure data lake and databricks adf also handled scheduling monitoring and error handling reducing manual effort ' },
    { id: 'azure-2', title: 'How did you implement incremental loading in ADF?', url: 'azure.html#azure-2', tags: 'how did you implement incremental loading in adf we implemented incremental loading using a watermark column such as last updated date during each pipeline run adf loaded only the new or updated records instead of the entire dataset this reduced processing time and improved performance ' },
    { id: 'azure-3', title: 'Which ADF activities were used?', url: 'azure.html#azure-3', tags: 'which adf activities were used in my project i used copy data activity to move data lookup activity to read configuration values foreach activity to process multiple files if condition for validations stored procedure activity for database operations and execute pipeline to call another pipeline ' },
    { id: 'azure-4', title: 'What is Unity Catalog?', url: 'azure.html#azure-4', tags: 'what is unity catalog unity catalog is databricks centralized data governance solution it helps manage tables files permissions and data access from one place it provides fine grained security auditing and easy data sharing across teams ' },
    { id: 'azure-5', title: 'What is Liquid Clustering?', url: 'azure.html#azure-5', tags: 'what is liquid clustering liquid clustering is a databricks feature that automatically organizes data without manually repartitioning it it improves query performance by reducing the amount of data scanned it is more flexible than traditional partitioning because data can be reorganized automaticall' },
    { id: 'azure-6', title: 'What is Delta Lake? What are its features?', url: 'azure.html#azure-6', tags: 'what is delta lake what are its features delta lake is an open source storage layer built on top of a data lake it provides acid transactions schema enforcement schema evolution time travel and data versioning these features make data more reliable and suitable for etl pipelines ' },
    { id: 'azure-7', title: 'What is the difference between Managed Tables and External Tables?', url: 'azure.html#azure-7', tags: 'what is the difference between managed tables and external tables managed tables store both data and metadata inside databricks if the table is deleted the data is also deleted external tables store only the metadata in databricks while the actual data remains in external storage like adls or s3 del' },
    { id: 'azure-8', title: 'How does Azure Key Vault help?', url: 'azure.html#azure-8', tags: 'how does azure key vault help azure key vault securely stores secrets such as passwords api keys and connection strings instead of hardcoding credentials in the code applications retrieve them securely from key vault this improves security and simplifies secret management ' },
    { id: 'azure-9', title: 'What is Databricks and what is the Architecture of Databricks?', url: 'azure.html#azure-9', tags: 'what is databricks and what is the architecture of databricks azure databricks is a cloud based platform for big data processing and machine learning using apache spark its architecture includes a control plane which manages clusters and notebooks and a data plane where spark clusters process the da' },
    { id: 'azure-10', title: 'How do you secure PII data?', url: 'azure.html#azure-10', tags: 'how do you secure pii data i secure pii data by masking or encrypting sensitive columns such as names email ids and phone numbers i use role based access control so only authorized users can view the data i also store secrets in azure key vault and enable encryption for data at rest and in transit ' },
    { id: 'scenarios-1', title: 'You are ingesting daily sales data into S3. One day, the pipeline ingests duplicate records. How will you detect and handle this duplication?', url: 'scenarios.html#scenarios-1', tags: 'you are ingesting daily sales data into s3 one day the pipeline ingests duplicate records how will you detect and handle this duplication in this situation i would first identify duplicate records using the primary key or a combination of business keys in spark i would use dropduplicates to remove d' },
    { id: 'scenarios-2', title: 'A Glue job that usually runs in 10 minutes is now taking 1 hour. How do you debug and optimize it?', url: 'scenarios.html#scenarios-2', tags: 'a glue job that usually runs in 10 minutes is now taking 1 hour how do you debug and optimize it first i would check the glue job logs in cloudwatch to identify the bottleneck then i would check for data skew unnecessary shuffles or an increase in input data size i would optimize the job using parti' },
    { id: 'scenarios-3', title: 'Your Spark job is failing with an Out Of Memory (OOM) error on the executor nodes. What steps will you take to resolve it?', url: 'scenarios.html#scenarios-3', tags: 'your spark job is failing with an out of memory oom error on the executor nodes what steps will you take to resolve it i would first check the spark ui to identify which stage is causing the memory issue then i would avoid collect on large datasets increase executor memory if required reduce data sh' },
    { id: 'scenarios-4', title: 'You are asked to implement schema evolution in your pipeline. Yesterday the source added a new column, breaking your ETL job. How will you handle it in Glue or Spark?', url: 'scenarios.html#scenarios-4', tags: 'you are asked to implement schema evolution in your pipeline yesterday the source added a new column breaking your etl job how will you handle it in glue or spark i would enable schema evolution so the pipeline can handle new columns automatically in aws glue i would update the glue crawler or data ' },
    { id: 'scenarios-5', title: 'You are migrating a SQL-based on-prem data warehouse to AWS Redshift. What are the key factors you will consider to ensure performance and cost efficiency?', url: 'scenarios.html#scenarios-5', tags: 'you are migrating a sql based on prem data warehouse to aws redshift what are the key factors you will consider to ensure performance and cost efficiency i would choose the correct distribution key and sort key use column compression and load data in bulk using s3 i would also convert frequently use' },
    { id: 'scenarios-6', title: 'Your Redshift query is running for hours without finishing. How do you debug and optimize it?', url: 'scenarios.html#scenarios-6', tags: 'your redshift query is running for hours without finishing how do you debug and optimize it i would first check the redshift query plan and system tables to identify the slow operation then i would verify the distribution key and sort key create or update statistics using analyze and remove unnecess' },
    { id: 'scenarios-7', title: 'An Airflow DAG failed in production due to a missing connection configuration. How will you troubleshoot and fix the issue?', url: 'scenarios.html#scenarios-7', tags: 'an airflow dag failed in production due to a missing connection configuration how will you troubleshoot and fix the issue i would first check the airflow logs to identify the missing connection then i would verify the connection details in the airflow ui under admin connections after updating the co' },
    { id: 'scenarios-8', title: 'Your data pipeline has upstream dependencies (3 sources). One source failed, but the pipeline still ingested incomplete data. How will you implement data quality checks?', url: 'scenarios.html#scenarios-8', tags: 'your data pipeline has upstream dependencies 3 sources one source failed but the pipeline still ingested incomplete data how will you implement data quality checks i would add validation checks before starting the etl process the pipeline should verify that all three source files are available and c' },
    { id: 'scenarios-9', title: 'A client requests near-real-time dashboards, but your system only supports batch processing. How will you redesign the pipeline to support near real-time analytics?', url: 'scenarios.html#scenarios-9', tags: 'a client requests near real time dashboards but your system only supports batch processing how will you redesign the pipeline to support near real time analytics i would redesign the pipeline using streaming technologies such as kafka spark structured streaming or aws kinesis incoming data would be ' },
    { id: 'scenarios-10', title: 'Your data is landing in S3 as CSV files, but analysts are complaining about query performance in Athena. How would you improve performance without changing the source system?', url: 'scenarios.html#scenarios-10', tags: 'your data is landing in s3 as csv files but analysts are complaining about query performance in athena how would you improve performance without changing the source system i would convert the csv files into parquet format using aws glue because parquet is columnar and much faster for athena queries ' },
    { id: 'scenarios-11', title: 'In a PySpark job, you notice data skew where one key has 90% of the records. How would you handle this issue?', url: 'scenarios.html#scenarios-11', tags: 'in a pyspark job you notice data skew where one key has 90 of the records how would you handle this issue i would first identify the skewed key using the spark ui or by checking the data distribution then i would use salting to split the heavy key into multiple partitions or use a broadcast join if ' },
    { id: 'scenarios-12', title: 'You are handling GDPR-compliant data. How will you ensure PII data masking and encryption in your ETL pipeline?', url: 'scenarios.html#scenarios-12', tags: 'you are handling gdpr compliant data how will you ensure pii data masking and encryption in your etl pipeline i would identify all pii columns such as name email and phone number sensitive data would be masked or encrypted before storing it i would also use iam roles and encryption for s3 to ensure ' },
    { id: 'scenarios-13', title: 'You are asked to design an SCD Type 2 pipeline in Glue. How will you track history while keeping query performance acceptable?', url: 'scenarios.html#scenarios-13', tags: 'you are asked to design an scd type 2 pipeline in glue how will you track history while keeping query performance acceptable i would compare the source and target data to identify changed records the old record would be marked as inactive and a new record would be inserted with the updated informati' },
    { id: 'scenarios-14', title: 'Your batch ETL pipeline has strict SLAs (must finish before 8 AM daily). What steps will you take to ensure timely completion even when data volume doubles?', url: 'scenarios.html#scenarios-14', tags: 'your batch etl pipeline has strict slas must finish before 8 am daily what steps will you take to ensure timely completion even when data volume doubles i would optimize spark jobs by reducing shuffles using partitioning and processing only incremental data instead of the full dataset i would also m' },
    { id: 'scenarios-15', title: 'During a production release, your Spark job failed because of missing Python packages. How would you package and deploy external dependencies reliably in Glue/Lambda/Spark?', url: 'scenarios.html#scenarios-15', tags: 'during a production release your spark job failed because of missing python packages how would you package and deploy external dependencies reliably in glue lambda spark i would package all required python libraries before deployment and include them with the glue job or lambda function i would test' },
    { id: 'scenarios-16', title: 'You are asked to integrate third-party API data into your S3 data lake. How will you handle API throttling, retries, and incremental loads?', url: 'scenarios.html#scenarios-16', tags: 'you are asked to integrate third party api data into your s3 data lake how will you handle api throttling retries and incremental loads i would implement retry logic with delays if the api limit is reached i would load only new or updated records using timestamps or ids instead of fetching all data ' },
    { id: 'scenarios-17', title: 'A downstream analytics team reports inconsistent results from the same dataset at different times of the day. How do you debug and ensure data consistency?', url: 'scenarios.html#scenarios-17', tags: 'a downstream analytics team reports inconsistent results from the same dataset at different times of the day how do you debug and ensure data consistency i would first verify whether the etl pipeline completed successfully then i would compare the source and target data check for partial loads and v' },
    { id: 'scenarios-18', title: 'Your team wants to move from a monolithic ETL pipeline to modular micro-ETL jobs. What benefits will this provide, and how would you implement it?', url: 'scenarios.html#scenarios-18', tags: 'your team wants to move from a monolithic etl pipeline to modular micro etl jobs what benefits will this provide and how would you implement it i would divide the large pipeline into smaller independent etl jobs this makes the pipeline easier to maintain test and troubleshoot each job can run separa' },
    { id: 'scenarios-19', title: 'A data scientist asks you to provide training data from multiple sources (structured + unstructured). How do you design a pipeline to ensure clean, joined, and high-quality data?', url: 'scenarios.html#scenarios-19', tags: 'a data scientist asks you to provide training data from multiple sources structured unstructured how do you design a pipeline to ensure clean joined and high quality data i would collect data from all sources clean and validate it remove duplicates and standardize the format then i would join the da' },
    { id: 'scenarios-20', title: 'Your data pipeline is built on AWS services. A regionwide outage occurs. How will you design for fault tolerance and high availability?', url: 'scenarios.html#scenarios-20', tags: 'your data pipeline is built on aws services a regionwide outage occurs how will you design for fault tolerance and high availability i would store backup data in another aws region using cross region replication i would enable automated backups and design the pipeline to fail over to the secondary r' },
    { id: 'scenarios-21', title: 'The business team requests near real-time alerts when fraud transactions are detected. How would you implement this on AWS?', url: 'scenarios.html#scenarios-21', tags: 'the business team requests near real time alerts when fraud transactions are detected how would you implement this on aws i would use amazon kinesis to capture streaming data process it using aws lambda or spark streaming and apply fraud detection rules if a suspicious transaction is found i would s' },
    { id: 'scenarios-22', title: 'Every day we load data and the job is scheduled, but today it failed. Data will not be loaded. What do you do?', url: 'scenarios.html#scenarios-22', tags: 'every day we load data and the job is scheduled but today it failed data will not be loaded what do you do first i would check the job logs in cloudwatch or airflow to find the root cause after fixing the issue i would rerun only the failed job instead of the entire pipeline then i would validate th' },
    { id: 'scenarios-23', title: 'You have TABLE1 (0, 1, 1, 2, 3, NULL) and TABLE2 (1, 2, 3, NULL, NULL). Give the output of Cross Join, Left Outer Join, Right Outer Join, Full Outer Join.', url: 'scenarios.html#scenarios-23', tags: 'you have table1 0 1 1 2 3 null and table2 1 2 3 null null give the output of cross join left outer join right outer join full outer join cross join every row of table1 joins with every row of table2 6 5 30 rows left join returns all rows from table1 and matching rows from table2 unmatched rows show ' },
    { id: 'scenarios-24', title: 'If you have a pipeline that has completed 40% of the job but then fails, how do you ensure the rest 60% completes without re-executing the first 40%?', url: 'scenarios.html#scenarios-24', tags: 'if you have a pipeline that has completed 40 of the job but then fails how do you ensure the rest 60 completes without re executing the first 40 i would use checkpointing or incremental processing the pipeline stores the last successfully processed record or batch after fixing the issue it resumes f' },
    { id: 'scenarios-25', title: 'You are processing large files without using Spark. How do you approach this?', url: 'scenarios.html#scenarios-25', tags: 'you are processing large files without using spark how do you approach this i would process the file in smaller chunks instead of loading the entire file into memory depending on the requirement i would use python generators pandas chunk processing or batch processing this prevents memory issues and' },
    { id: 'scenarios-26', title: 'You have 100 stores connected via API and want data from all stores every 10 minutes with exception handling. How do you design this?', url: 'scenarios.html#scenarios-26', tags: 'you have 100 stores connected via api and want data from all stores every 10 minutes with exception handling how do you design this i would schedule the api calls using airflow or lambda each store would have its own task with retry logic and error handling failed api calls would be logged and retri' },
    { id: 'scenarios-27', title: 'Keeping a KPI in mind, explain how you are extracting, cleaning, and loading data.', url: 'scenarios.html#scenarios-27', tags: 'keeping a kpi in mind explain how you are extracting cleaning and loading data i first extract data from the source system or api then i clean the data by removing duplicates handling missing values and validating business rules finally i load the cleaned data into redshift or s3 ensuring the kpi ca' },
    { id: 'scenarios-28', title: 'How do you restrict duplicate records from passing downstream in your pipeline?', url: 'scenarios.html#scenarios-28', tags: 'how do you restrict duplicate records from passing downstream in your pipeline i remove duplicate records using business keys or primary keys before loading the data in spark i use dropduplicates and perform data quality checks this ensures only unique records are sent to downstream systems ' },
    { id: 'scenarios-29', title: 'You have a new client with different data vendors and 15 key metrics that change weekly or monthly. How would you set up an ETL pipeline?', url: 'scenarios.html#scenarios-29', tags: 'you have a new client with different data vendors and 15 key metrics that change weekly or monthly how would you set up an etl pipeline i would create separate ingestion jobs for each vendor and store the raw data in s3 then i would build transformation jobs to standardize the data and calculate the' },
    { id: 'scenarios-30', title: 'Design a pipeline for an e-commerce application. What tables and columns do you need?', url: 'scenarios.html#scenarios-30', tags: 'design a pipeline for an e commerce application what tables and columns do you need i would create tables such as customers products orders order items payments and shipments important columns include customer id product id order id quantity price payment status order date and delivery status the pi' },
    { id: 'scenarios-31', title: 'It takes 36 hours in Elasticsearch for Oracle data to be ingested and processed. How do you optimize this?', url: 'scenarios.html#scenarios-31', tags: 'it takes 36 hours in elasticsearch for oracle data to be ingested and processed how do you optimize this i would use incremental loading instead of full loading process data in parallel optimize batch size and reduce unnecessary transformations i would also monitor the pipeline to identify bottlenec' },
    { id: 'scenarios-32', title: 'What production issue did you face?', url: 'scenarios.html#scenarios-32', tags: 'what production issue did you face one production issue i faced was duplicate records being loaded because the source system resent the same file i identified the issue using row count validation and removed duplicates using business keys before loading the data i also added duplicate validation che' },
    { id: 'scenarios-33', title: 'What was the SLA of your project?', url: 'scenarios.html#scenarios-33', tags: 'what was the sla of your project our project sla was that the complete etl pipeline had to finish before 8 00 am every day so that business users could access fresh reports we continuously monitored the pipeline optimized spark jobs and configured alerts to ensure the sla was always met ' },
    { id: 'git-1', title: 'How did you use Git in your project?', url: 'git.html#git-1', tags: 'how did you use git in your project in my project we used git for version control every developer worked on a separate branch committed their changes locally and pushed them to github after code review through a pull request the changes were merged into the main branch this helped us collaborate wit' },
    { id: 'git-2', title: 'What is the Git workflow followed in your project?', url: 'git.html#git-2', tags: 'what is the git workflow followed in your project our workflow was clone the repository create a feature branch make code changes commit the changes push to github create a pull request code review merge into the main branch deploy the application clone copy the repository locally feature branch cre' },
    { id: 'git-3', title: 'What happens when you run git push?', url: 'git.html#git-3', tags: 'what happens when you run git push git push uploads all committed changes from the local repository to the remote github repository it allows other team members to access the latest code usually after pushing the code we create a pull request for review before merging ' },
    { id: 'git-4', title: 'Why do we create branches in Git?', url: 'git.html#git-4', tags: 'why do we create branches in git we create branches to develop new features or fix bugs without affecting the main code every developer works on their own branch once the work is completed and reviewed it is merged into the main branch ' },
    { id: 'git-5', title: 'What is a Pull Request (PR)?', url: 'git.html#git-5', tags: 'what is a pull request pr a pull request is a request to merge code from one branch into another it allows team members to review the code suggest changes and approve it before merging this helps maintain code quality and avoid production issues ' },
    { id: 'git-6', title: 'What is a Merge Conflict? How did you resolve it?', url: 'git.html#git-6', tags: 'what is a merge conflict how did you resolve it a merge conflict occurs when two developers modify the same part of the same file git cannot decide which change to keep automatically i resolved it by reviewing both changes keeping the correct code testing it and then committing the resolved version ' },
    { id: 'git-7', title: 'What Git commands do you use most often?', url: 'git.html#git-7', tags: 'what git commands do you use most often in my daily work i mostly use git clone git status git add git commit git pull git push git branch git checkout and git merge these commands are enough for most day to day development tasks git clone git status git add git commit git pull git push git branch g' },
    { id: 'git-8', title: 'What will you do if your local branch is behind the remote branch?', url: 'git.html#git-8', tags: 'what will you do if your local branch is behind the remote branch first i would run git pull to fetch the latest changes from the remote repository if there are any conflicts i would resolve them test the code and then push my updated changes back to github ' },
    { id: 'git-9', title: 'How do you check which files have changed before committing?', url: 'git.html#git-9', tags: 'how do you check which files have changed before committing i use the git status command to check modified staged and untracked files if i want to see the exact code changes i use git diff before committing git status check modified staged and untracked files git diff see the exact code changes befo' },
    { id: 'git-10', title: 'What production issue did you face while using Git?', url: 'git.html#git-10', tags: 'what production issue did you face while using git one issue i faced was a merge conflict when two developers modified the same file we resolved the conflict by reviewing both changes testing the final code and then merging it after that we informed the team to pull the latest code before making fur' },
    { id: 'git-11', title: 'What is the difference between git fetch and git pull?', url: 'git.html#git-11', tags: 'what is the difference between git fetch and git pull git fetch only downloads the latest changes from the remote repository but does not merge them git pull downloads the changes and automatically merges them into the current branch i usually use git pull to keep my branch updated git fetch downloa' },
    { id: 'git-12', title: 'Suppose you accidentally committed a wrong file. What will you do?', url: 'git.html#git-12', tags: 'suppose you accidentally committed a wrong file what will you do if the commit is only in my local repository i can undo it and recommit the correct files if it has already been pushed i would use git commands like git revert or create a new commit to fix the mistake depending on the team s process ' },
    { id: 'cicd-1', title: 'What happens when a developer raises a Pull Request?', url: 'cicd.html#cicd-1', tags: 'what happens when a developer raises a pull request when a developer raises a pull request the ci pipeline is triggered automatically it runs code quality checks unit tests sql validation pyspark tests and airflow dag validation if all tests pass and the pr is approved the code is merged into the ma' },
    { id: 'cicd-2', title: 'Why do we use separate Dev, QA, and Production environments?', url: 'cicd.html#cicd-2', tags: 'why do we use separate dev qa and production environments separate environments help us test code safely before releasing it to users developers make changes in dev testers validate them in qa and only approved code is deployed to production this reduces the risk of production failures and improves ' },
    { id: 'cicd-3', title: 'What happens if unit tests fail during CI?', url: 'cicd.html#cicd-3', tags: 'what happens if unit tests fail during ci if unit tests fail the ci pipeline stops immediately and the code is not deployed further the developer checks the test logs fixes the issue and pushes the updated code the pipeline is then triggered again until all tests pass ' },
    { id: 'cicd-4', title: 'Why should secrets never be stored in Git?', url: 'cicd.html#cicd-4', tags: 'why should secrets never be stored in git secrets such as passwords api keys and database credentials should never be stored in git because they can be exposed to unauthorized users instead we use aws secrets manager parameter store or azure key vault to securely manage sensitive information ' },
    { id: 'cicd-5', title: 'What is the benefit of Infrastructure as Code (IaC)?', url: 'cicd.html#cicd-5', tags: 'what is the benefit of infrastructure as code iac infrastructure as code allows us to create and manage cloud resources using code instead of manually creating them tools like terraform and aws cdk help automate infrastructure deployment this provides consistency version control and faster deploymen' },
    { id: 'cicd-6', title: 'How do you deploy the same code to multiple environments?', url: 'cicd.html#cicd-6', tags: 'how do you deploy the same code to multiple environments we use the same application code across all environments and change only the configuration values parameters such as s3 buckets database names iam roles and secrets are stored separately for dev qa and production this makes deployments safer a' },
    { id: 'cicd-7', title: 'What is the purpose of approval gates in Production?', url: 'cicd.html#cicd-7', tags: 'what is the purpose of approval gates in production approval gates ensure that production deployment happens only after manual approval before approving we verify test results deployment logs and release notes this reduces the risk of deploying incorrect or unstable code to production ' },
    { id: 'cicd-8', title: 'How do you ensure safe production deployment?', url: 'cicd.html#cicd-8', tags: 'how do you ensure safe production deployment before deployment i make sure all unit tests integration tests and data quality checks have passed i also validate the deployment in dev and qa environments if required i keep a rollback plan ready in case any production issue occurs ' },
    { id: 'cicd-9', title: 'How do you monitor a pipeline after deployment?', url: 'cicd.html#cicd-9', tags: 'how do you monitor a pipeline after deployment after deployment i monitor cloudwatch logs glue job status airflow dag runs execution time and failure alerts i also compare source and target record counts to verify successful data processing any failures are immediately notified to the support team ' },
    { id: 'cicd-10', title: 'What are some common production issues in CI/CD?', url: 'cicd.html#cicd-10', tags: 'what are some common production issues in ci cd common production issues include failed unit tests missing python packages iam permission errors broken airflow dags schema mismatches and incorrect environment variables i troubleshoot these issues using pipeline logs fix the root cause and redeploy t' },
    { id: 'cicd-11', title: 'What is the role of Git in CI/CD?', url: 'cicd.html#cicd-11', tags: 'what is the role of git in ci cd git is used as the version control system to manage source code developers create feature branches commit changes and raise pull requests whenever code is merged into the main branch the ci cd pipeline is automatically triggered for testing and deployment ' },
    { id: 'cicd-12', title: 'How do you reduce deployment failures?', url: 'cicd.html#cicd-12', tags: 'how do you reduce deployment failures i reduce deployment failures by using automated testing code reviews environment specific configurations and proper secret management i also validate deployments in dev and qa before moving them to production this ensures stable and reliable deployments ' }
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
              // reveal the answer if the target is a collapsed question card
              if (window.__expandTopic) window.__expandTopic(hash);
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
        el.classList.remove('is-open');
      } else {
        // expand
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0';
        requestAnimationFrame(function () {
          content.style.maxHeight = content.scrollHeight + 'px';
          if (icon) icon.style.transform = 'rotate(0deg)';
        });
        states[id] = true;
        el.classList.add('is-open');
        // remove max-height after transition so content can resize
        setTimeout(function () { content.style.maxHeight = 'none'; content.style.overflow = ''; }, 400);
      }
      save();
    }

    // Programmatically reveal an answer (hash navigation, search, sidebar links)
    function expandId(id) {
      if (!id) return false;
      var el = document.getElementById(decodeURIComponent(id));
      if (!el || !el.classList.contains('expandable-section')) return false;
      var content = el.querySelector('.expandable-content');
      var icon    = el.querySelector('.expandable-icon');
      if (!content) return false;
      states[el.id] = true;
      save();
      el.classList.add('is-open');
      content.style.maxHeight = 'none';
      content.style.overflow = '';
      if (icon) icon.style.transform = 'rotate(0deg)';
      return true;
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
          section.classList.add('is-open');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          section.classList.remove('is-open');
          if (icon) icon.style.transform = 'rotate(-90deg)';
        }

        var header = section.querySelector('.expandable-header');
        if (header) on(header, 'click', function () { toggleSection(id); });
      });

      // reveal the target of a #hash (deep link / search result / browser navigation)
      if (location.hash) expandId(location.hash.substring(1));
      window.addEventListener('hashchange', function () {
        expandId(location.hash.substring(1));
      });
      window.__expandTopic = expandId;
    }

    return { init: init, expand: expandId };
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
