import { Router } from "express";
import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";

const cartsRouter = Router();
const mongoCartManager = new MongoCartManager();

cartsRouter.post("/", async (req, res) => {
  try {
    const response = await mongoCartManager.createCart();
    res.json(response);
  } catch (error) {
    res.status(500).send("Error al crear el carrito");
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const response = await mongoCartManager.getCartProducts(cid);
    res.json(response);
  } catch (error) {
    res.status(500).send("Error al intentar mandar los productos del carrito");
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
    res.status(500).send("Error al intentar guardar productos en el carrito");
  }
});

export { cartsRouter };
