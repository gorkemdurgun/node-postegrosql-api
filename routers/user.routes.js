import express from "express";

import postgresClient from "../config/db.js";
import { deleteUser, getAllUsers, insertUser, selectUser, updateUserFullname } from "../sql_queries/userQueries.js";

const router = express.Router();

// Get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const result = await postgresClient.query(getAllUsers());
    const users = result.rows;
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a user
router.post("/createUser", async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const result = await postgresClient.query(insertUser(email, password, fullname));
    const user = result.rows[0];
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a user by id
router.get("/getUserById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await postgresClient.query(selectUser(id));
    const user = result.rows[0];
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update fullname of a user by id
router.put("/updateFullname/:id", async (req, res) => {
  const id = req.params.id;
  const newFullname = req.body.fullname;
  try {
    const result = await postgresClient.query(updateUserFullname(id, newFullname));
    const user = result.rows[0];
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by id
router.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await postgresClient.query(deleteUser(id));
    const user = result.rows[0];
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
