# SQL Mastery
## Learn SQL from Zero to Data Engineer Interview Level

> A structured, practical SQL learning path designed for beginners, data engineers, analysts, developers, and interview preparation.

---

# 🎯 Learning Path

This course follows a progressive learning path.

```text
01. Database Fundamentals
        ↓
02. SQL Basics
        ↓
03. Filtering & Sorting
        ↓
04. CRUD Operations
        ↓
05. Functions & Expressions
        ↓
06. Aggregation
        ↓
07. GROUP BY & HAVING
        ↓
08. JOINs
        ↓
09. Subqueries
        ↓
10. CTEs
        ↓
11. Window Functions
        ↓
12. Advanced SQL Problems
        ↓
13. Views & Stored Procedures
        ↓
14. Transactions & SQL Commands
        ↓
15. Indexing & Query Optimization
        ↓
16. Database Design
        ↓
17. Normalization
        ↓
18. OLTP / OLAP
        ↓
19. Star & Snowflake Schema
        ↓
20. SQL Interview Mastery
```

---

# 🟢 LEVEL 1 — DATABASE FUNDAMENTALS

## 1.1 What is SQL?

### What you will learn

- What SQL is
- Why SQL is used
- What a relational database is
- What tables, rows and columns mean
- Where SQL is used in real applications

### What is SQL?

SQL stands for **Structured Query Language**.

It is used to communicate with relational databases.

With SQL, we can:

- Create database objects
- Insert data
- Read data
- Update data
- Delete data
- Analyze data
- Manage relationships between tables

### Example

```sql
SELECT *
FROM employees;
```

This query asks the database:

> "Give me all columns and all rows from the employees table."

---

## 1.2 What is a Database?

A database is an organized collection of data.

Example:

```text
Company Database
│
├── employees
├── departments
├── jobs
├── job_history
├── customers
└── orders
```

---

## 1.3 Tables

A table stores data in:

- Rows
- Columns

Example:

```text
employees

employee_id | first_name | salary
------------|------------|--------
101         | John       | 75000
102         | Jane       | 68000
103         | Robert     | 85000
```

### Row

One complete record.

### Column

One attribute of the record.

---

# 🟢 LEVEL 2 — SQL VS NOSQL

## 2.1 SQL Databases

SQL databases are relational databases.

Examples:

- MySQL
- PostgreSQL
- SQL Server
- Oracle

Data is normally organized into related tables.

---

## 2.2 NoSQL Databases

NoSQL databases use non-relational models.

Common models include:

- Document
- Key-value
- Graph
- Wide-column

Example:

```text
MongoDB
```

---

## 2.3 SQL vs NoSQL

| SQL | NoSQL |
|---|---|
| Relational | Non-relational |
| Tables | Documents/key-value/etc. |
| Structured schema | Often flexible schema |
| Strong relationships | Relationships depend on model |
| Excellent for relational transactions | Often useful for distributed/flexible workloads |

### Interview question

**Q: What is the difference between SQL and NoSQL?**

Focus on:

1. Data model
2. Schema
3. Relationships
4. Transaction requirements
5. Scaling strategy

---

# 🟢 LEVEL 3 — DATABASE KEYS

## 3.1 Primary Key

A primary key uniquely identifies a row.

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    salary DECIMAL(10,2)
);
```

Example:

```text
employee_id
-----------
101
102
103
```

Each value identifies one employee.

### Important properties

- Unique
- Cannot be NULL
- One primary-key constraint per table
- Can contain multiple columns as a composite key

---

# 3.2 Foreign Key

A foreign key creates a relationship between tables.

```text
employees
department_id
      │
      ↓
departments
department_id
```

Example:

```sql
FOREIGN KEY (department_id)
REFERENCES departments(department_id)
```

---

# 3.3 Candidate Key

A candidate key is any column or combination of columns capable of uniquely identifying a row.

---

# 3.4 Composite Key

A composite key uses multiple columns.

```sql
PRIMARY KEY (order_id, product_id)
```

---

# 3.5 Natural vs Surrogate Key

### Natural Key

A real business value.

Example:

```text
email
product_code
```

### Surrogate Key

A generated identifier.

Example:

```text
customer_id = 10001
```

---

# 🟢 LEVEL 4 — CONSTRAINTS

Common constraints:

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
```

Example:

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) CHECK (salary > 0)
);
```

---

# 🟢 LEVEL 5 — PRACTICE DATABASE

All examples in this course should use a consistent database.

## employees

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    hire_date DATE,
    job_id VARCHAR(20),
    salary DECIMAL(10,2),
    department_id INT,
    manager_id INT
);
```

## departments

```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100),
    location VARCHAR(100),
    manager_id INT
);
```

## jobs

```sql
CREATE TABLE jobs (
    job_id VARCHAR(20) PRIMARY KEY,
    job_title VARCHAR(100),
    min_salary DECIMAL(10,2),
    max_salary DECIMAL(10,2)
);
```

## job_history

```sql
CREATE TABLE job_history (
    employee_id INT,
    start_date DATE,
    end_date DATE,
    job_id VARCHAR(20),
    department_id INT,
    PRIMARY KEY (employee_id, start_date)
);
```

---

# 🟢 LEVEL 6 — SELECT

## 6.1 Select Everything

```sql
SELECT *
FROM employees;
```

---

## 6.2 Select Specific Columns

```sql
SELECT
    first_name,
    last_name,
    salary
FROM employees;
```

### Learning point

Prefer selecting required columns instead of always using `SELECT *`.

---

# 🟢 LEVEL 7 — FILTERING

## WHERE

`WHERE` filters rows.

```sql
SELECT *
FROM employees
WHERE salary > 75000;
```

---

## AND

```sql
SELECT *
FROM employees
WHERE salary > 70000
AND department_id = 10;
```

---

## OR

```sql
SELECT *
FROM employees
WHERE department_id = 10
OR department_id = 20;
```

---

## NOT

```sql
SELECT *
FROM employees
WHERE NOT department_id = 10;
```

---

# 🟢 LEVEL 8 — DISTINCT

```sql
SELECT DISTINCT department_id
FROM employees;
```

### Purpose

Returns unique result values.

---

# 🟢 LEVEL 9 — ORDER BY

Ascending:

```sql
SELECT *
FROM employees
ORDER BY salary ASC;
```

Descending:

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

---

# 🟢 LEVEL 10 — LIMIT / TOP

MySQL/PostgreSQL style:

```sql
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

SQL Server commonly uses:

```sql
SELECT TOP 5 *
FROM employees
ORDER BY salary DESC;
```

> SQL dialect matters. The website should clearly label database-specific syntax.

---

# 🟢 LEVEL 11 — LIKE

Starts with M:

```sql
SELECT *
FROM employees
WHERE first_name LIKE 'M%';
```

Ends with n:

```sql
SELECT *
FROM employees
WHERE first_name LIKE '%n';
```

Contains `ar`:

```sql
SELECT *
FROM employees
WHERE first_name LIKE '%ar%';
```

### Wildcards

```text
% → zero or more characters
_ → exactly one character
```

---

# 🟢 LEVEL 12 — IN

```sql
SELECT *
FROM employees
WHERE department_id IN (10, 20, 30);
```

---

# 🟢 LEVEL 13 — BETWEEN

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 70000 AND 90000;
```

`BETWEEN` is inclusive at both boundaries.

---

# 🟢 LEVEL 14 — NULL

Always teach NULL separately.

```sql
SELECT *
FROM employees
WHERE manager_id IS NULL;
```

Not:

```sql
WHERE manager_id = NULL;
```

For non-null:

```sql
WHERE manager_id IS NOT NULL;
```

---

# 🟢 LEVEL 15 — CRUD

CRUD means:

```text
CREATE
READ
UPDATE
DELETE
```

---

## INSERT

```sql
INSERT INTO employees
(employee_id, first_name, salary)
VALUES
(101, 'John', 75000);
```

---

## UPDATE

```sql
UPDATE employees
SET salary = 80000
WHERE employee_id = 101;
```

### Important

Always be careful with:

```sql
UPDATE employees
SET salary = 80000;
```

Without `WHERE`, every row may be updated.

---

## DELETE

```sql
DELETE FROM employees
WHERE employee_id = 101;
```

---

# 🟡 LEVEL 16 — SQL FUNCTIONS

## Aggregate Functions

```text
COUNT()
SUM()
AVG()
MIN()
MAX()
```

---

## COUNT

```sql
SELECT COUNT(*) AS employee_count
FROM employees;
```

---

## SUM

```sql
SELECT SUM(salary) AS total_salary
FROM employees;
```

---

## AVG

```sql
SELECT AVG(salary) AS average_salary
FROM employees;
```

---

## MIN / MAX

```sql
SELECT
    MIN(salary) AS minimum_salary,
    MAX(salary) AS maximum_salary
FROM employees;
```

---

# 🟡 LEVEL 17 — GROUP BY

## Average salary by department

```sql
SELECT
    department_id,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;
```

### Mental model

```text
Employees
   ↓
Group by department
   ↓
Calculate average
   ↓
One result per department
```

---

# 🟡 LEVEL 18 — HAVING

`HAVING` filters groups.

```sql
SELECT
    department_id,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 75000;
```

---

# ⭐ WHERE vs HAVING

| WHERE | HAVING |
|---|---|
| Filters rows | Filters groups |
| Before GROUP BY | After GROUP BY |
| Usually no aggregate condition | Commonly used with aggregates |

### Easy rule

```text
WHERE  → individual rows
HAVING → grouped results
```

---

# 🟡 LEVEL 19 — JOINS

This is one of the most important sections.

## Why do we need JOIN?

Real databases usually separate information into multiple tables.

Example:

```text
employees
    |
    | department_id
    ↓
departments
```

JOIN brings related information together.

---

# 19.1 INNER JOIN

Returns matching records.

```sql
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id;
```

### Read it step by step

```text
employees e
     ↓
match department_id
     ↓
departments d
     ↓
return employee + department
```

---

# 19.2 LEFT JOIN

Returns every row from the left table.

```sql
SELECT
    d.department_name,
    e.first_name
FROM departments d
LEFT JOIN employees e
    ON d.department_id = e.department_id;
```

Useful question:

> Show all departments, including departments with no employees.

---

# 19.3 RIGHT JOIN

```sql
SELECT
    e.first_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.department_id;
```

---

# 19.4 FULL OUTER JOIN

Returns matching and unmatched rows from both sides.

```sql
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d
    ON e.department_id = d.department_id;
```

> Availability differs by database. MySQL does not have native FULL OUTER JOIN.

---

# 19.5 SELF JOIN

A table joins to itself.

This is especially important for employee-manager relationships.

```sql
SELECT
    e.first_name AS employee,
    m.first_name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;
```

### Understand the aliases

```text
employees e → employee
employees m → manager
```

The same table is treated as two logical copies.

---

# 19.6 Employee Earning More Than Manager

```sql
SELECT
    e.first_name AS employee_name,
    e.salary AS employee_salary,
    m.first_name AS manager_name,
    m.salary AS manager_salary
FROM employees e
JOIN employees m
    ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;
```

### Most important part

```sql
e.manager_id = m.employee_id
```

This is how the manager is found.

---

# 19.7 CROSS JOIN

Every row from one table combines with every row from another.

```sql
SELECT
    a.team_name AS team_a,
    b.team_name AS team_b
FROM teams a
CROSS JOIN teams b;
```

If:

```text
A = 4 rows
B = 5 rows
```

Result:

```text
4 × 5 = 20 rows
```

---

# 🟡 LEVEL 20 — MULTI-TABLE JOINS

```sql
SELECT
    e.first_name,
    d.department_name,
    j.job_title
FROM employees e
JOIN departments d
    ON e.department_id = d.department_id
JOIN jobs j
    ON e.job_id = j.job_id;
```

### Query thinking

```text
Employee
   ↓
Department
   ↓
Job
   ↓
Final result
```

---

# 🟡 LEVEL 21 — SUBQUERIES

A subquery is a query inside another query.

## Employees above company average

```sql
SELECT
    first_name,
    salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

### Step 1

Calculate average:

```sql
SELECT AVG(salary)
FROM employees;
```

### Step 2

Compare each employee:

```text
employee salary > average salary
```

---

# 🟡 LEVEL 22 — SECOND HIGHEST SALARY

## Method 1 — MAX

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

---

## Method 2 — DENSE_RANK

```sql
WITH ranked_employees AS (
    SELECT
        employee_id,
        first_name,
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT *
FROM ranked_employees
WHERE salary_rank = 2;
```

### Interview tip

If the interviewer says:

> "Second highest salary"

clarify whether they mean:

- Second highest **distinct salary**
- Second employee after sorting

For distinct salary ranking, `DENSE_RANK()` is usually the clearest approach.

---

# 🟡 LEVEL 23 — CTE

CTE = Common Table Expression.

Syntax:

```sql
WITH cte_name AS (
    SELECT ...
)
SELECT *
FROM cte_name;
```

---

## Example

```sql
WITH high_salary_employees AS (
    SELECT
        employee_id,
        first_name,
        salary
    FROM employees
    WHERE salary > 70000
)
SELECT *
FROM high_salary_employees;
```

### Why use CTE?

CTEs improve:

- Readability
- Query organization
- Multi-step logic
- Maintainability

---

# 🔴 LEVEL 24 — WINDOW FUNCTIONS

This should be one of the most important advanced sections for a Data Engineer.

Window functions perform calculations across related rows **without collapsing those rows**.

---

# 24.1 GROUP BY vs Window Function

### GROUP BY

```sql
SELECT
    department_id,
    AVG(salary)
FROM employees
GROUP BY department_id;
```

Result:

```text
Department | Average
-----------|--------
10         | 76500
20         | 69500
```

Employee rows are grouped.

---

### Window Function

```sql
SELECT
    employee_id,
    first_name,
    salary,
    AVG(salary) OVER (
        PARTITION BY department_id
    ) AS department_average
FROM employees;
```

Result conceptually:

```text
Employee | Salary | Department Average
---------|--------|------------------
John     | 75000  | 76500
Michael  | 78000  | 76500
```

Employee rows remain.

### Golden rule

> **GROUP BY reduces rows. PARTITION BY keeps rows.**

---

# 24.2 ROW_NUMBER

```sql
SELECT
    first_name,
    salary,
    ROW_NUMBER() OVER (
        ORDER BY salary DESC
    ) AS row_number
FROM employees;
```

Every row receives a unique number.

---

# 24.3 RANK

```sql
SELECT
    first_name,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Example:

```text
Salary   Rank
100000   1
100000   1
90000    3
80000    4
```

---

# 24.4 DENSE_RANK

```sql
SELECT
    first_name,
    salary,
    DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Example:

```text
Salary   Rank
100000   1
100000   1
90000    2
80000    3
```

---

# 24.5 Ranking Comparison

| Function | Ties | Gaps | Unique row number |
|---|---|---|---|
| ROW_NUMBER | No shared rank | No | Yes |
| RANK | Same rank | Yes | No |
| DENSE_RANK | Same rank | No | No |

---

# 24.6 PARTITION BY

Rank employees within each department.

```sql
SELECT
    employee_id,
    first_name,
    department_id,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS department_rank
FROM employees;
```

### Think:

```text
Department 10
    ↓
Rank employees

Department 20
    ↓
Rank employees

Department 30
    ↓
Rank employees
```

---

# 24.7 Employees Above Department Average

```sql
SELECT *
FROM (
    SELECT
        employee_id,
        first_name,
        department_id,
        salary,
        AVG(salary) OVER (
            PARTITION BY department_id
        ) AS department_average
    FROM employees
) x
WHERE salary > department_average;
```

### This is a very important interview pattern.

---

# 24.8 LAG

Returns a previous row's value.

```sql
SELECT
    employee_id,
    first_name,
    salary,
    LAG(salary) OVER (
        ORDER BY hire_date
    ) AS previous_salary
FROM employees;
```

---

# 24.9 LEAD

Returns a next row's value.

```sql
SELECT
    employee_id,
    first_name,
    salary,
    LEAD(salary) OVER (
        ORDER BY hire_date
    ) AS next_salary
FROM employees;
```

---

# 24.10 Previous Transaction

Question:

> For each customer, show the amount from their previous transaction.

```sql
SELECT
    customer_id,
    transaction_date,
    amount,
    LAG(amount) OVER (
        PARTITION BY customer_id
        ORDER BY transaction_date
    ) AS previous_amount
FROM transactions;
```

### Think:

```text
Customer
   ↓
Sort by date
   ↓
Look at previous row
   ↓
LAG()
```

---

# 24.11 Next Transaction

```sql
SELECT
    customer_id,
    transaction_date,
    amount,
    LEAD(amount) OVER (
        PARTITION BY customer_id
        ORDER BY transaction_date
    ) AS next_amount
FROM transactions;
```

---

# 24.12 Running Total

```sql
SELECT
    customer_id,
    transaction_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY transaction_date
    ) AS running_total
FROM transactions;
```

---

# 🔴 LEVEL 25 — SQL EXECUTION ORDER

This is essential for understanding SQL.

```text
FROM
  ↓
JOIN
  ↓
ON
  ↓
WHERE
  ↓
GROUP BY
  ↓
HAVING
  ↓
SELECT
  ↓
DISTINCT
  ↓
ORDER BY
  ↓
LIMIT
```

### Easy memory

> FROM → JOIN → ON → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT

### Why this matters

Suppose:

```sql
SELECT
    salary * 12 AS annual_salary
FROM employees
WHERE annual_salary > 1000000;
```

This can fail because the `WHERE` stage logically occurs before the `SELECT` alias is produced.

A subquery or CTE can solve such problems.

---

# 🔴 LEVEL 26 — ADVANCED SQL INTERVIEW PROBLEMS

## Problem 1 — Second Highest Salary

Use:

- Subquery
- `DENSE_RANK`
- CTE

---

## Problem 2 — Highest Salary Per Department

```sql
WITH ranked AS (
    SELECT
        employee_id,
        first_name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS rnk
    FROM employees
)
SELECT *
FROM ranked
WHERE rnk = 1;
```

---

## Problem 3 — Employees Above Department Average

Use:

```text
AVG() OVER(PARTITION BY ...)
```

---

## Problem 4 — Employee Earning More Than Manager

Use:

```text
SELF JOIN
```

---

## Problem 5 — Previous Transaction

Use:

```text
LAG()
```

---

## Problem 6 — Next Transaction

Use:

```text
LEAD()
```

---

## Problem 7 — Duplicate Records

```sql
SELECT
    first_name,
    last_name,
    email,
    COUNT(*) AS duplicate_count
FROM employees
GROUP BY
    first_name,
    last_name,
    email
HAVING COUNT(*) > 1;
```

---

## Problem 8 — Identify Duplicate Rows Using ROW_NUMBER

```sql
WITH duplicates AS (
    SELECT
        employee_id,
        first_name,
        last_name,
        email,
        ROW_NUMBER() OVER (
            PARTITION BY first_name, last_name, email
            ORDER BY employee_id
        ) AS rn
    FROM employees
)
SELECT *
FROM duplicates
WHERE rn > 1;
```

---

# 🔴 LEVEL 27 — CASE STATEMENT

CASE provides conditional logic.

```sql
SELECT
    first_name,
    salary,
    CASE
        WHEN salary >= 90000 THEN 'High'
        WHEN salary >= 70000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;
```

### Mental model

```text
IF salary >= 90000
    High

ELSE IF salary >= 70000
    Medium

ELSE
    Low
```

---

# 🔴 LEVEL 28 — VIEWS

A view is a stored query definition.

```sql
CREATE VIEW high_salary_employees AS
SELECT
    employee_id,
    first_name,
    salary
FROM employees
WHERE salary > 80000;
```

Query:

```sql
SELECT *
FROM high_salary_employees;
```

---

# 🔴 LEVEL 29 — MATERIALIZED VIEWS

A materialized view stores the query result physically and must be refreshed according to the database's capabilities.

Concept:

```text
Base Tables
    ↓
Complex Query
    ↓
Materialized Result
    ↓
Fast Reads
```

### View vs Materialized View

| View | Materialized View |
|---|---|
| Stores query definition | Stores result |
| Usually calculates when queried | Reads stored result |
| Current underlying data | Can become stale |
| Low storage | Requires storage |
| Good abstraction | Good for expensive repeated queries |

---

# 🔴 LEVEL 30 — STORED PROCEDURES

A stored procedure is reusable SQL logic stored in the database.

Example SQL Server style:

```sql
CREATE PROCEDURE UpdateEmployeeSalary
    @employee_id INT,
    @new_salary DECIMAL(10,2)
AS
BEGIN
    UPDATE employees
    SET salary = @new_salary
    WHERE employee_id = @employee_id;
END;
```

---

# 🔴 LEVEL 31 — DELETE vs TRUNCATE vs DROP

| Command | Deletes rows | Deletes structure | WHERE |
|---|---|---|---|
| DELETE | Yes | No | Yes |
| TRUNCATE | All rows | No | No |
| DROP | Yes | Yes | No |

### DELETE

```sql
DELETE FROM employees
WHERE employee_id = 101;
```

### TRUNCATE

```sql
TRUNCATE TABLE employees;
```

### DROP

```sql
DROP TABLE employees;
```

---

# 🔴 LEVEL 32 — INDEXING

Indexes help databases find rows efficiently for suitable queries.

Example:

```sql
CREATE INDEX idx_employee_department
ON employees(department_id);
```

### Important

Indexes are not automatically good everywhere.

They have costs:

- Storage
- Insert overhead
- Update overhead
- Delete overhead
- Maintenance

---

# 🔴 LEVEL 33 — QUERY OPTIMIZATION

## Important topics

```text
Indexes
Execution plans
Statistics
Join strategy
Filtering
Avoiding unnecessary columns
Partitioning
Query rewriting
```

---

## EXPLAIN

Example:

```sql
EXPLAIN
SELECT *
FROM employees
WHERE department_id = 10;
```

Use the execution plan to understand how the database intends to execute the query.

---

# 🔴 LEVEL 34 — PARTITIONING

Partitioning divides a large table into smaller partitions.

Example:

```text
orders
│
├── 2023
├── 2024
├── 2025
└── 2026
```

Common strategies:

- Range
- List
- Hash

---

# 🔴 LEVEL 35 — SHARDING

Sharding distributes data across multiple database nodes.

```text
Application
    │
    ├── Shard 1
    ├── Shard 2
    └── Shard 3
```

### Partitioning vs Sharding

```text
Partitioning
→ dividing data within a database system

Sharding
→ distributing data across database nodes/instances
```

---

# 🔵 LEVEL 36 — DATA MODELING

Data modeling is the process of designing how data is organized.

Three levels:

```text
Conceptual
    ↓
Logical
    ↓
Physical
```

---

# 36.1 Conceptual Model

High-level business view.

Example:

```text
Customer
   |
places
   |
Order
```

---

# 36.2 Logical Model

Adds:

- Attributes
- Relationships
- Keys
- Cardinality

---

# 36.3 Physical Model

Adds implementation details:

- Tables
- Columns
- Data types
- Indexes
- Constraints
- Storage

---

# 🔵 LEVEL 37 — NORMALIZATION

Normalization reduces unnecessary data duplication and improves data integrity.

---

# 37.1 First Normal Form — 1NF

Values should be atomic.

Bad:

```text
student_id | courses
-----------|----------------
1          | SQL, Python, Java
```

Better:

```text
student_id | course
-----------|--------
1          | SQL
1          | Python
1          | Java
```

---

# 37.2 Second Normal Form — 2NF

A table should:

1. Be in 1NF
2. Have non-key attributes depend on the entire primary key

Important concept:

> Partial dependency

This is especially relevant when a table has a composite key.

---

# 37.3 Third Normal Form — 3NF

A table should:

1. Be in 2NF
2. Avoid transitive dependency

Example:

```text
employee_id
     ↓
department_id
     ↓
department_name
```

Department name belongs in the department table.

---

# 🔵 LEVEL 38 — OLTP VS OLAP

## OLTP

Online Transaction Processing.

Examples:

- Banking transactions
- Order creation
- Customer updates
- Payments

Characteristics:

```text
Many small transactions
Frequent INSERT/UPDATE/DELETE
Operational data
Transactional consistency
```

---

## OLAP

Online Analytical Processing.

Examples:

- Reporting
- Business intelligence
- Historical analysis
- Data warehouse queries

Characteristics:

```text
Large analytical queries
Aggregations
Historical data
Read-heavy workloads
```

---

# 🔵 LEVEL 39 — FACT AND DIMENSION TABLES

## Fact Table

Stores measurable business events.

Example:

```text
sales
---------------------------
sales_id
customer_id
product_id
date_id
quantity
sales_amount
```

---

## Dimension Table

Stores descriptive information.

Example:

```text
customer
----------------
customer_id
customer_name
city
country
segment
```

Common dimensions:

- Customer
- Product
- Date
- Location
- Employee

---

# 🔵 LEVEL 40 — STAR SCHEMA

A fact table is placed at the center.

```text
             Date
              │
              │
Customer ── Sales ── Product
              │
              │
          Geography
```

### Characteristics

- Central fact table
- Dimension tables around it
- Usually simpler queries
- Common in analytical systems

---

# 🔵 LEVEL 41 — SNOWFLAKE SCHEMA

A snowflake schema further normalizes dimensions.

```text
                 Product
                    │
              Product Category
                    │
Customer ───── Sales ───── Date
```

### Characteristics

- More normalized dimensions
- More tables
- More joins
- Reduced redundancy in some designs
- More complex queries

---

# 🔵 LEVEL 42 — STAR VS SNOWFLAKE

| Star | Snowflake |
|---|---|
| Less normalized | More normalized |
| Simpler | More complex |
| Fewer joins | More joins |
| Easy for reporting | More normalized dimensions |
| Common analytical design | Common analytical design |

---

# 💼 LEVEL 43 — INTERVIEW MASTERCLASS

This section should be separate from normal lessons.

## Beginner Interview Questions

1. What is SQL?
2. What is a database?
3. What is a table?
4. What is a primary key?
5. What is a foreign key?
6. What is NULL?
7. What is the difference between DELETE and TRUNCATE?
8. What is the difference between WHERE and HAVING?
9. What is GROUP BY?
10. What is DISTINCT?

---

## Intermediate Interview Questions

1. Explain INNER JOIN.
2. Explain LEFT JOIN.
3. Explain SELF JOIN.
4. Find the second highest salary.
5. Find employees above average salary.
6. Find the highest salary in each department.
7. Find duplicate records.
8. Count employees by department.
9. Find departments without employees.
10. Explain subqueries.
11. Explain CTEs.

---

## Advanced Interview Questions

1. Explain `ROW_NUMBER`, `RANK`, and `DENSE_RANK`.
2. Explain `LAG` and `LEAD`.
3. Find employees earning more than their manager.
4. Find employees above department average.
5. Find the previous transaction for each customer.
6. Find the next transaction.
7. Calculate running totals.
8. Remove duplicate records safely.
9. Explain execution order.
10. Explain indexes.
11. Explain partitioning.
12. Explain query execution plans.
13. Explain normalization.
14. Explain OLTP vs OLAP.
15. Explain star vs snowflake schema.

---

# 🧠 SQL PROBLEM-SOLVING FRAMEWORK

When given a SQL interview problem, use this process.

## Step 1 — Understand the required output

Ask:

```text
What columns do I need?
```

---

## Step 2 — Identify the tables

Ask:

```text
Where does each column come from?
```

---

## Step 3 — Identify relationships

Look for:

```text
Primary Key
Foreign Key
```

---

## Step 4 — Decide whether JOIN is required

If data exists in multiple tables:

```text
JOIN
```

---

## Step 5 — Decide whether filtering is required

Use:

```text
WHERE
```

---

## Step 6 — Decide whether aggregation is required

If the question says:

```text
average
total
count
maximum
minimum
per department
per customer
```

think:

```text
GROUP BY
```

---

## Step 7 — Decide whether the individual rows must remain

If yes, consider:

```text
Window Function
```

---

## Step 8 — Decide whether multiple logical steps are required

Use:

```text
CTE
```

---

# 🧩 SQL DECISION TREE

```text
Do I need data from multiple tables?
        │
       YES
        ↓
       JOIN
        │
       NO
        ↓
   Continue

Do I need one result per group?
        │
       YES
        ↓
    GROUP BY
        │
       NO
        ↓
   Continue

Do I need group calculations while keeping rows?
        │
       YES
        ↓
 WINDOW FUNCTION
        │
       NO
        ↓
   Continue

Does one query depend on another query?
        │
       YES
        ↓
 SUBQUERY / CTE
```

---

# 📚 SQL CHEAT SHEET

## Filtering

```sql
WHERE
AND
OR
NOT
IN
BETWEEN
LIKE
IS NULL
IS NOT NULL
```

## Sorting

```sql
ORDER BY
ASC
DESC
```

## Aggregation

```sql
COUNT()
SUM()
AVG()
MIN()
MAX()
GROUP BY
HAVING
```

## Joins

```sql
INNER JOIN
LEFT JOIN
RIGHT JOIN
FULL OUTER JOIN
SELF JOIN
CROSS JOIN
```

## Advanced SQL

```sql
WITH
OVER()
PARTITION BY
ROW_NUMBER()
RANK()
DENSE_RANK()
LAG()
LEAD()
```

## Database Design

```text
Primary Key
Foreign Key
Normalization
Fact
Dimension
Star Schema
Snowflake Schema
```

## Performance

```text
Index
Execution Plan
Partitioning
Sharding
```

---

# 🏆 FINAL SQL LEARNING PROGRESSION

The learner should complete the website in this exact order:

```text
PHASE 1 — FOUNDATIONS
├── What is SQL?
├── Database
├── Tables
├── Rows
├── Columns
├── SQL vs NoSQL
└── CRUD

PHASE 2 — DATABASE DESIGN BASICS
├── Primary Key
├── Foreign Key
├── Candidate Key
├── Composite Key
├── Natural Key
├── Surrogate Key
└── Constraints

PHASE 3 — BASIC QUERYING
├── SELECT
├── Aliases
├── DISTINCT
├── WHERE
├── AND
├── OR
├── NOT
├── NULL
├── LIKE
├── IN
├── BETWEEN
├── ORDER BY
└── LIMIT / TOP

PHASE 4 — DATA MODIFICATION
├── INSERT
├── UPDATE
└── DELETE

PHASE 5 — AGGREGATION
├── COUNT
├── SUM
├── AVG
├── MIN
├── MAX
├── GROUP BY
└── HAVING

PHASE 6 — JOINS
├── INNER JOIN
├── LEFT JOIN
├── RIGHT JOIN
├── FULL OUTER JOIN
├── SELF JOIN
├── CROSS JOIN
└── Multi-table JOIN

PHASE 7 — SUBQUERIES
├── Scalar subquery
├── Multi-row subquery
├── Correlated subquery
└── Interview problems

PHASE 8 — CTE
├── Basic CTE
├── Multiple CTEs
└── CTE + Window Functions

PHASE 9 — WINDOW FUNCTIONS
├── OVER()
├── PARTITION BY
├── ORDER BY
├── ROW_NUMBER
├── RANK
├── DENSE_RANK
├── LAG
├── LEAD
├── Running Total
└── Department Analytics

PHASE 10 — SQL REASONING
├── Execution Order
├── GROUP BY vs Window Functions
├── JOIN reasoning
└── Query debugging

PHASE 11 — DATABASE FEATURES
├── Views
├── Materialized Views
├── Stored Procedures
└── DELETE / TRUNCATE / DROP

PHASE 12 — PERFORMANCE
├── Indexes
├── B-Tree
├── Hash Index
├── Composite Index
├── Execution Plans
├── Partitioning
└── Sharding

PHASE 13 — DATA MODELING
├── Conceptual Model
├── Logical Model
├── Physical Model
├── Normalization
├── 1NF
├── 2NF
└── 3NF

PHASE 14 — DATA WAREHOUSE
├── OLTP
├── OLAP
├── Fact Tables
├── Dimension Tables
├── Star Schema
└── Snowflake Schema

PHASE 15 — INTERVIEW MASTERCLASS
├── Basic Problems
├── JOIN Problems
├── Aggregation Problems
├── Subquery Problems
├── CTE Problems
├── Window Function Problems
├── Self Join Problems
├── Duplicate Problems
└── Real-world SQL Scenarios
```

---

# 🖥️ RECOMMENDED WEBSITE STRUCTURE

The website should have:

```text
┌─────────────────────────────────────────────┐
│ SQL MASTER                                  │
│ Learn SQL → Practice → Interview            │
├───────────────┬─────────────────────────────┤
│ SIDEBAR       │ LESSON                      │
│               │                             │
│ Foundations   │ What is SQL?                │
│ Basics        │                             │
│ Filtering     │ Explanation                 │
│ Aggregation   │                             │
│ Joins         │ Example                     │
│ Subqueries    │                             │
│ CTE           │ SQL Code                    │
│ Windows       │                             │
│ Advanced      │ Expected Output             │
│ Performance   │                             │
│ Modeling      │ Step-by-step                │
│ Interview     │                             │
│               │ Practice                    │
└───────────────┴─────────────────────────────┘
```

Every lesson should contain:

```text
1. Concept
2. Why is it important?
3. Syntax
4. Example
5. Sample Data
6. Expected Output
7. Step-by-Step Explanation
8. Common Mistakes
9. Interview Question
10. Practice Questions
11. Related Topics
```

---

# 🤖 AI WEBSITE BUILDER INSTRUCTIONS

Use this document as the **canonical SQL curriculum**.

The AI website builder should:

- Preserve the learning order.
- Never duplicate lessons.
- Use consistent table and column names.
- Use `employees`, `departments`, `jobs`, and `job_history` as the primary examples.
- Introduce concepts before interview problems.
- Never introduce window functions before explaining `GROUP BY`.
- Explain `PARTITION BY` only after explaining `GROUP BY`.
- Explain `LAG` and `LEAD` only after explaining `OVER`, `PARTITION BY`, and `ORDER BY`.
- Explain CTEs after subqueries.
- Put interview problems after the learner has learned the required concepts.
- Clearly label database-specific syntax.
- Use diagrams for JOINs, execution order, normalization, star schema and snowflake schema.
- Use tables for comparisons.
- Use syntax-highlighted SQL blocks.
- Show expected output wherever practical.
- Include interactive SQL exercises after major sections.
- Add progress tracking.
- Add difficulty labels.
- Add "Previous Lesson" and "Next Lesson" navigation.
- Add a "Practice" section at the end of every major lesson.
- Add an "Interview Question" section to intermediate and advanced lessons.

---

# 🎓 COURSE COMPLETION GOAL

After completing this learning path, the learner should be able to:

- Write SQL queries confidently.
- Retrieve and filter data.
- Aggregate data.
- Join multiple tables.
- Understand SQL execution order.
- Write subqueries and CTEs.
- Use window functions.
- Solve common SQL interview problems.
- Understand indexes and query plans.
- Understand partitioning and sharding.
- Understand normalization.
- Understand data modeling.
- Understand OLTP and OLAP.
- Understand star and snowflake schemas.
- Approach real-world Data Engineer SQL problems systematically.

# END