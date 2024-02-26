import { Router } from "express";
import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";

const cartsRouter = Router();
const mongoCartManager = new MongoCartManager();

cartsRouter.post("/", async (req, res) => {
  try {
    const response = await mongoCartManager.createCart();
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const response = await mongoCartManager.getCartProducts(id);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const response = await mongoCartManager.addProductToCart(
      cid,
      pid,
      quantity
    );
    res.status(200).send("Producto agregado con éxito");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

//eliminacion por id
cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const response = await mongoCartManager.deleteProduct(cid, pid);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//eliminacion de los productos del carrito
cartsRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await mongoCartManager.deleteAllProducts(cid);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update quantity
cartsRouter.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const response = await mongoCartManager.updateQuantity(cid, pid, quantity);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { cartsRouter };
