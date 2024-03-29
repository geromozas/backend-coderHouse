import { Router } from "express";
import { mongoProductManager } from "../index.js";
import { io } from "../index.js";
import { MongoMessageManager } from "../dao/mongoManagers/mongoMessageManager.js";
import { mongoCartManager } from "./carts.router.js";

export const viewsRouter = Router();
const mongoMessageManager = new MongoMessageManager();

viewsRouter.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort = 1 } = req.query;
    const products = await mongoProductManager.getProducts(
      limit,
      page,
      query,
      sort
    );
    console.log(products);
    if (products.status === "success") {
      console.log(products.payload);
      res.render("home", { products: products.payload });
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
