import express from "express";
import jwt from "jsonwebtoken";

import postgresClient from "../config/db.js";

const router = express.Router();

// Authenticate a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = {
    text: "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)",
    values: [email, password],
  };
  try {
    const result = await postgresClient.query(query);
    const user = result.rows[0];
    if (user) {
      res.send({
        id: user.id,
        email: user.email,
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
