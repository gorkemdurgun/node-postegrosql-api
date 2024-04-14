import express from "express";
import cors from "cors";
import postgresClient from "./config/db.js";

import userRouter from "./routers/user.routes.js";
import authRouter from "./routers/auth.routes.js";

var corsOptions = {
  origin: "http://localhost:8081",
};

const port = process.env.PORT || 3000;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  postgresClient.connect((err) => {
    if (err) {
      console.error("Connection error", err.stack);
    } else {
      console.log("Connected to database");
    }
  });
});
