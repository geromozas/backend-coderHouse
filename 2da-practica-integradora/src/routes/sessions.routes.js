import express from "express";
import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";

const sessionRouter = Router();
export const mongoUserManager = new MongoUserManager();

sessionRouter.post("/register", async (req, res) => {
  try {
    const newUser = await mongoUserManager.register(req.body);
    res.redirect("http://localhost:8080/views/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    const user = await mongoUserManager.login(req.body);
    req.session.user = user;
    res.redirect("http://localhost:8080/views/products");
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Error en logout");
  });
  res.redirect("http://localhost:8080/views/login");
});

sessionRouter.get("/user", (req, res) => {
  res.send(users);
});

export default sessionRouter;
