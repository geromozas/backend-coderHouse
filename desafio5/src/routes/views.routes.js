import { Router } from "express";
import { mongoProductManager } from "../index.js";
import { io } from "../index.js";
import { MongoMessageManager } from "../dao/mongoManagers/mongoMessageManager.js";
import { mongoCartManager } from "./carts.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const viewsRouter = Router();
const mongoMessageManager = new MongoMessageManager();

viewsRouter.get("/products", authMiddleware, async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort = 1 } = req.query;
    const products = await mongoProductManager.getProducts(
      limit,
      page,
      query,
      sort
    );
    const first_name = req.session.user.first_name;
    // console.log(products);
    if (products.status === "success") {
      // console.log(products.payload);
      res.render("home", { products: products.payload, first_name });
    } else {
      res.render("home", { products: [] });
    }
  } catch (error) {
    res.json(error.message);
  }
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort = 1 } = req.query;
    const products = await mongoProductManager.getProducts(
      limit,
      page,
      query,
      sort
    );
    res.render("realTimeProducts", { products: products.payload });
  } catch (error) {
    res.json(error.message);
  }
});

viewsRouter.get("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await mongoCartManager.getCartProducts(id);
    res.render("cart", { products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const messages = await mongoMessageManager.getMessages();
    res.render("chat", { messages: messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

viewsRouter.post("/chat", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await mongoMessageManager.addMessage(user, message);
    io.emit("message", newMessage);
    return res.json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//sessions
viewsRouter.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

viewsRouter.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

viewsRouter.get("/profile", (req, res) => {
  try {
    res.render("profile");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
