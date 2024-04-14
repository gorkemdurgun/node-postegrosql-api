import { Sequelize } from "sequelize";

let db = {};

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  retry: {
    max: 10,
  },
  logging: true,
});

const CONNECT_DB = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    res.status(500).send("Unable to connect to the database");
  }
};

db.CONNECT_DB = CONNECT_DB;
db.sequelize = sequelize;

export default db;
