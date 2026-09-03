const SAMPLE_DATA = {
  users: {
    columns: ["id", "name", "age", "country", "active"],
    rows: [
      [1, "alice", 30, "US", 1],
      [2, "bob", 25, "CA", 1],
      [3, "carol", 17, "US", 0],
      [4, "dave", 40, "CA", 1],
      [5, "erin", 22, "US", 1],
      [6, "frank", 35, "US", 1],
      [7, "grace", 19, "CA", 1]
    ]
  },
  customers: {
    columns: ["customer_id", "name", "country"],
    rows: [
      [1, "alice", "US"],
      [2, "bob", "CA"],
      [3, "carol", "US"],
      [4, "dave", "CA"],
      [5, "erin", "US"]
    ]
  },
  orders: {
    columns: ["order_id", "customer_id", "order_date", "amount"],
    rows: [
      [1, 1, "2024-01-01", 100],
      [2, 1, "2024-01-05", 50],
      [3, 2, "2024-01-02", 200],
      [4, 3, "2024-01-03", 75],
      [5, 1, "2024-02-01", 120],
      [6, 4, "2024-01-10", 300],
      [7, 2, "2024-02-15", 80]
    ]
  }
};
