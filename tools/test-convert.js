const { convertSqlToPySpark } = require('../js/sql-to-pyspark.js');
const qs = [
  "SELECT name, age FROM users WHERE age >= 18 AND country = 'US'",
  "SELECT o.order_id, c.name, o.amount FROM orders o JOIN customers c ON o.customer_id = c.customer_id",
  "SELECT country, COUNT(*) AS users, AVG(age) AS avg_age FROM users GROUP BY country HAVING COUNT(*) > 10",
  "SELECT c.name, SUM(o.amount) AS total FROM orders o JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.name ORDER BY total DESC",
  "SELECT customer_id, order_date, amount, SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total, RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS spend_rank FROM orders",
  "SELECT name FROM users WHERE age > 21 LIMIT 3",
  "SELECT name FROM users WHERE age > (SELECT AVG(age) FROM users)"
];
for (const q of qs) {
  console.log("=== SQL:", q);
  const r = convertSqlToPySpark(q);
  console.log(r === null ? "(not supported / fallback)" : r);
  console.log("");
}
