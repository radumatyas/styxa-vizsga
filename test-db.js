const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Database connected at:", res.rows[0].now);
  }
  pool.end();
});
