import { Router } from "express";
import { mongoProductManager } from "../index.js";
import { io } from "../index.js";

const productsRouter = Router();

//ver todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await mongoProductManager.getProducts();
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en intentar recibir los productos");
  }
});

//ver producto por id
productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const products = await mongoProductManager.getProductsById(pid);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error en intentar recibir el producto con id ${pid}`);
  }
});

//agregar producto
productsRouter.post("/", async (req, res) => {
  try {
    const productAdded = await mongoProductManager.addProduct(req.body);
    io.emit("productAdded", productAdded);
    res.json(productAdded);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error en intentar agregar el producto`);
  }
});

//actualizar producto
productsRouter.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await mongoProductManager.updateProduct(id, req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error en intentar editar el producto con id ${pid}`);
  }
});

//eliminar producto
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await mongoProductManager.deleteProduct(id);
    res.send("Producto eliminado exitosamente");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Error en intentar eliminar el producto con id ${pid}`);
  }
});

export { productsRouter };
