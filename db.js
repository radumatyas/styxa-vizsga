import { Pool } from "./db.js";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "styxa",
  password: "12345",
  port: 5432,
});

export default pool;
