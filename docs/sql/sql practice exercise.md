# SQL Practice Exercises

A structured collection of SQL exercises designed to help learners
practice SQL from beginner to advanced level.

Each exercise contains:

- Exercise number
- Difficulty
- Topic
- Problem statement
- SQL query
- Expected learning outcome

---

# 🟢 BASIC SQL EXERCISES

## Exercise 1 — Select All Columns

**Difficulty:** Beginner  
**Topic:** SELECT

### Problem

Retrieve all columns from the `employees` table.

### SQL

SELECT *
FROM employees;

### Practice Goal

Learn how to retrieve all columns from a table.

---

## Exercise 2 — Select Specific Columns

**Difficulty:** Beginner  
**Topic:** SELECT

### Problem

Retrieve the `first_name` and `last_name` columns from the
`employees` table.

### SQL

SELECT first_name, last_name
FROM employees;

### Practice Goal

Learn how to retrieve only the required columns.

---

## Exercise 3 — Filter Rows Using WHERE

**Difficulty:** Beginner  
**Topic:** WHERE

### Problem

Retrieve employees whose age is greater than 30.

### SQL

SELECT *
FROM employees
WHERE age > 30;

### Practice Goal

Learn how to filter rows using conditions.

---

## Exercise 4 — Sort Data Using ORDER BY

**Difficulty:** Beginner  
**Topic:** ORDER BY

### Problem

Retrieve all employees sorted by `last_name` in ascending order.

### SQL

SELECT *
FROM employees
ORDER BY last_name ASC;

### Practice Goal

Learn how to sort query results.

---

## Exercise 5 — Limit the Number of Rows

**Difficulty:** Beginner  
**Topic:** LIMIT

### Problem

Retrieve the first 5 employees from the table.

### SQL

SELECT *
FROM employees
LIMIT 5;

### Practice Goal

Learn how to restrict the number of rows returned.

---

## Exercise 6 — Calculate Average Salary

**Difficulty:** Beginner  
**Topic:** Aggregate Functions

### Problem

Calculate the average salary from the `salaries` table.

### SQL

SELECT AVG(salary) AS average_salary
FROM salaries;

### Practice Goal

Learn how to use the `AVG()` aggregate function.

---

## Exercise 7 — Average Salary by Department

**Difficulty:** Beginner

### Problem

Calculate the average salary for each department.

### SQL

SELECT
    department_id,
    AVG(salary) AS average_salary
FROM salaries
GROUP BY department_id;

### Practice Goal

Learn how `GROUP BY` works with aggregate functions.

---

## Exercise 8 — Filter Groups Using HAVING

**Difficulty:** Beginner → Intermediate

### Problem

Retrieve departments whose average salary is greater than 50,000.

### SQL

SELECT
    department_id,
    AVG(salary) AS average_salary
FROM salaries
GROUP BY department_id
HAVING AVG(salary) > 50000;

### Practice Goal

Understand the difference between `WHERE` and `HAVING`.

---

# 🟡 INTERMEDIATE SQL EXERCISES

## Exercise 9 — INNER JOIN

**Difficulty:** Intermediate  
**Topic:** JOIN

### Problem

Retrieve employees along with their department names.

### SQL

SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id;

### Practice Goal

Learn how to combine related data from two tables.

---

## Exercise 10 — LEFT JOIN

**Difficulty:** Intermediate  
**Topic:** JOIN

### Problem

Retrieve all employees and their department names,
including employees who do not belong to a department.

### SQL

SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id;

### Practice Goal

Understand how `LEFT JOIN` preserves all rows from the left table.

---

## Exercise 11 — RIGHT JOIN

**Difficulty:** Intermediate  
**Topic:** JOIN

### Problem

Retrieve all departments and their employees,
including departments that have no employees.

### SQL

SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.department_id;

### Practice Goal

Understand how `RIGHT JOIN` preserves all rows from the right table.

---

## Exercise 12 — FULL OUTER JOIN

**Difficulty:** Intermediate  
**Topic:** JOIN

### Problem

Retrieve all employees and all departments,
including records that do not have a matching record.

### SQL

SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d
    ON e.department_id = d.department_id;

### Practice Goal

Understand how `FULL OUTER JOIN` returns matched and unmatched
records from both tables.

---

## Exercise 13 — SELF JOIN

**Difficulty:** Intermediate  
**Topic:** SELF JOIN

### Problem

Retrieve each employee along with their manager's name.

### SQL

SELECT
    e.first_name AS employee_name,
    m.first_name AS manager_name
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;

### Practice Goal

Learn how a table can be joined to itself.

---

## Exercise 14 — Subquery

**Difficulty:** Intermediate  
**Topic:** Subqueries

### Problem

Retrieve employees whose salary is greater than the overall
average salary.

### SQL

SELECT
    first_name,
    last_name,
    salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);

### Practice Goal

Understand how a subquery can be used inside a `WHERE` condition.

---

## Exercise 15 — EXISTS

**Difficulty:** Intermediate  
**Topic:** EXISTS

### Problem

Retrieve departments that have at least one employee.

### SQL

SELECT
    d.department_id,
    d.department_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.department_id
);

### Practice Goal

Learn how `EXISTS` checks whether a related record exists.

---

## Exercise 16 — IN

**Difficulty:** Intermediate  
**Topic:** IN

### Problem

Retrieve employees who belong to departments 1, 2, or 3.

### SQL

SELECT
    first_name,
    last_name,
    department_id
FROM employees
WHERE department_id IN (1, 2, 3);

### Practice Goal

Learn how to match a column against multiple values.

---

## Exercise 17 — UNION

**Difficulty:** Intermediate  
**Topic:** Set Operations

### Problem

Retrieve all unique job titles from `jobs` and `job_history`.

### SQL

SELECT job_title
FROM jobs

UNION

SELECT job_title
FROM job_history;

### Practice Goal

Understand how `UNION` combines result sets and removes duplicates.

---

## Exercise 18 — UNION ALL

**Difficulty:** Intermediate  
**Topic:** Set Operations

### Problem

Retrieve all job titles from `jobs` and `job_history`,
including duplicates.

### SQL

SELECT job_title
FROM jobs

UNION ALL

SELECT job_title
FROM job_history;

### Practice Goal

Understand the difference between `UNION` and `UNION ALL`.

---

## Exercise 19 — CASE Statement

**Difficulty:** Intermediate  
**Topic:** Conditional Logic

### Problem

Display whether each employee's salary is above or below
the overall average salary.

### SQL

SELECT
    first_name,
    last_name,
    salary,
    CASE
        WHEN salary > (
            SELECT AVG(salary)
            FROM employees
        )
        THEN 'Above Average'
        ELSE 'Below Average'
    END AS salary_comparison
FROM employees;

### Practice Goal

Learn how to create conditional output using `CASE`.

---

## Exercise 20 — COALESCE

**Difficulty:** Intermediate  
**Topic:** NULL Handling

### Problem

Display each employee's manager name. If the employee does not
have a manager, display `No Manager`.

### SQL

SELECT
    e.first_name,
    e.last_name,
    COALESCE(m.first_name, 'No Manager') AS manager_name
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;

### Practice Goal

Learn how to handle `NULL` values using `COALESCE()`.

---

# 🔴 ADVANCED SQL EXERCISES

## Exercise 21 — ROW_NUMBER

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Assign a unique row number to each employee within their department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    ROW_NUMBER() OVER (
        PARTITION BY department_id
        ORDER BY first_name
    ) AS row_num
FROM employees;

### Practice Goal

Understand `ROW_NUMBER()` and `PARTITION BY`.

---

## Exercise 22 — RANK

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Rank employees within each department based on salary,
from highest to lowest.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    RANK() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;

### Practice Goal

Understand ranking with ties.

---

## Exercise 23 — DENSE_RANK

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Rank employees within each department based on salary
using dense ranking.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS dense_rank
FROM employees;

### Practice Goal

Understand the difference between `RANK()` and `DENSE_RANK()`.

---

## Exercise 24 — NTILE

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Divide employees into 4 salary groups within each department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    NTILE(4) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS quartile
FROM employees;

### Practice Goal

Learn how `NTILE()` divides rows into groups.

---

## Exercise 25 — LEAD

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Retrieve the next employee's salary within each department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    LEAD(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS next_salary
FROM employees;

### Practice Goal

Learn how to access the value from the following row.

---

## Exercise 26 — LAG

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Retrieve the previous employee's salary within each department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    LAG(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS previous_salary
FROM employees;

### Practice Goal

Learn how to access the value from the previous row.

---

## Exercise 27 — FIRST_VALUE

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Retrieve the highest salary within each department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS first_salary
FROM employees;

### Practice Goal

Understand how `FIRST_VALUE()` works with window ordering.

---

## Exercise 28 — LAST_VALUE

**Difficulty:** Advanced  
**Topic:** Window Functions

### Problem

Retrieve the last salary according to the specified window ordering
within each department.

### SQL

SELECT
    first_name,
    last_name,
    department_id,
    salary,
    LAST_VALUE(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS last_salary
FROM employees;

### Practice Goal

Understand `LAST_VALUE()` and window frames.

> Note: `LAST_VALUE()` behavior can depend on the window frame.
> The website should explain this when presenting the exercise.

---

# 🔴 CTE & RECURSIVE SQL

## Exercise 29 — Common Table Expression

**Difficulty:** Advanced  
**Topic:** CTE

### Problem

Calculate the average salary for each department and display
it alongside each employee.

### SQL

WITH AvgSalaries AS (
    SELECT
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT
    e.first_name,
    e.last_name,
    e.salary,
    a.avg_salary
FROM employees e
JOIN AvgSalaries a
    ON e.department_id = a.department_id;

### Practice Goal

Learn how CTEs make complex queries easier to read.

---

## Exercise 30 — Recursive CTE

**Difficulty:** Advanced  
**Topic:** Recursive CTE

### Problem

Generate an employee hierarchy starting from employees
who do not have a manager.

### SQL

WITH RECURSIVE EmployeeHierarchy AS (
    SELECT
        employee_id,
        first_name,
        last_name,
        manager_id,
        0 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        eh.level + 1
    FROM employees e
    JOIN EmployeeHierarchy eh
        ON e.manager_id = eh.employee_id
)
SELECT *
FROM EmployeeHierarchy;

### Practice Goal

Learn how recursive CTEs can process hierarchical data.

---

# 🔴 ADVANCED DATA TRANSFORMATION

## Exercise 31 — PIVOT

**Difficulty:** Advanced  
**Topic:** PIVOT

### Problem

Generate a report showing total sales by product category
and month.

### SQL

SELECT *
FROM (
    SELECT
        product_category,
        MONTH(order_date) AS month,
        SUM(sales_amount) AS total_sales
    FROM sales
    GROUP BY
        product_category,
        MONTH(order_date)
) AS PivotTable
PIVOT (
    SUM(total_sales)
    FOR month IN (
        1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12
    )
) AS MonthlySales;

### Practice Goal

Understand how row-based data can be transformed into columns.

**SQL Dialect:** Dialect-specific syntax.

---

## Exercise 32 — UNPIVOT

**Difficulty:** Advanced  
**Topic:** UNPIVOT

### Problem

Convert monthly columns back into rows.

### SQL

SELECT
    product_id,
    month,
    sales_amount
FROM MonthlySales
UNPIVOT (
    sales_amount
    FOR month IN (
        1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12
    )
) AS UnpivotedSales;

### Practice Goal

Understand how column-based data can be transformed back into rows.

**SQL Dialect:** Dialect-specific syntax.

---

## Exercise 33 — MERGE

**Difficulty:** Advanced  
**Topic:** MERGE / Upsert

### Problem

Update existing records and insert new records from a staging
table into a target table.

### SQL

MERGE INTO target_table AS T
USING staging_table AS S
ON T.id = S.id

WHEN MATCHED THEN
    UPDATE SET
        T.col1 = S.col1,
        T.col2 = S.col2

WHEN NOT MATCHED THEN
    INSERT (id, col1, col2)
    VALUES (S.id, S.col1, S.col2);

### Practice Goal

Understand the concept of combining INSERT and UPDATE logic.

**SQL Dialect:** Dialect-specific syntax.

---

## Exercise 34 — UPDATE with a Condition

**Difficulty:** Intermediate

### Problem

Increase salary by 10% for employees with more than 5 years
of service.

### SQL

UPDATE employees
SET salary = salary * 1.10
WHERE years_of_service > 5;

### Practice Goal

Practice conditional data modification.

---

## Exercise 35 — INSERT INTO SELECT

**Difficulty:** Advanced

### Problem

Insert employee records from a temporary table into the
main employees table.

### SQL

INSERT INTO employees (
    employee_id,
    first_name,
    last_name,
    department_id
)
SELECT
    employee_id,
    first_name,
    last_name,
    department_id
FROM temp_employees;

### Practice Goal

Learn how to insert query results into another table.

---

# 🔴 VIEWS & STORED PROCEDURES

## Exercise 36 — Create a View

**Difficulty:** Advanced  
**Topic:** Views

### Problem

Create a view containing employee and department information.

### SQL

CREATE VIEW employee_details AS
SELECT
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.department_id;

### Practice Goal

Understand how views can simplify frequently used queries.

---

## Exercise 37 — Query a View

**Difficulty:** Advanced

### Problem

Retrieve data from the `employee_details` view.

### SQL

SELECT *
FROM employee_details;

### Practice Goal

Learn how to use a view like a table.

---

## Exercise 38 — Create a Stored Procedure

**Difficulty:** Advanced  
**Topic:** Stored Procedures

### Problem

Create a stored procedure that calculates a 10% bonus
for an employee.

### SQL

DELIMITER //

CREATE PROCEDURE calculate_bonus(IN emp_id INT)
BEGIN
    DECLARE bonus_amount DECIMAL(10,2);

    SELECT salary * 0.10
    INTO bonus_amount
    FROM employees
    WHERE employee_id = emp_id;

    UPDATE employees
    SET bonus = bonus_amount
    WHERE employee_id = emp_id;
END //

DELIMITER ;

### Practice Goal

Learn the basic structure of a stored procedure.

**SQL Dialect:** MySQL-style syntax.

---

## Exercise 39 — Call a Stored Procedure

**Difficulty:** Advanced

### Problem

Execute the `calculate_bonus` procedure for employee 1001.

### SQL

CALL calculate_bonus(1001);

### Practice Goal

Learn how to execute a stored procedure.

---

## Exercise 40 — Exception Handling in Stored Procedures

**Difficulty:** Advanced

### Problem

Create a stored procedure that handles an error while
inserting an employee.

### SQL

DELIMITER //

CREATE PROCEDURE insert_employee (
    IN emp_id INT,
    IN emp_name VARCHAR(255),
    IN dept_id INT
)
BEGIN

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error: Unable to insert employee.';
    END;

    START TRANSACTION;

    INSERT INTO employees (
        employee_id,
        employee_name,
        department_id
    )
    VALUES (
        emp_id,
        emp_name,
        dept_id
    );

    COMMIT;

END //

DELIMITER ;

### Practice Goal

Understand error handling and transaction control
inside stored procedures.

**SQL Dialect:** MySQL-style syntax.