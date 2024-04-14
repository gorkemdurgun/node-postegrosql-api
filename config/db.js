import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const postgresClient = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export default postgresClient;
