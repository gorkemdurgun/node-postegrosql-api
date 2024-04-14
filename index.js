import express from "express";
import cors from "cors";

// import postgresClient from "./config/db.js";

import userRouter from "./routers/user.routes.js";
import authRouter from "./routers/auth.routes.js";

import db from "./database/index.js";

var corsOptions = {
  //   origin: "http://localhost:8081",
};

const port = process.env.PORT || 3000;

const app = express();
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

db.CONNECT_DB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
