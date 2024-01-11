import express from "express";
import { ProductManager } from "./desafio3.js";

const app = express();

const productManager = new ProductManager();

app.get("/api/products", async (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    const products = await productManager.getProducts();
    res.json(products);
  }
});

app.get("/api/product/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = await productManager.getProductById(id);
  if (producto) {
    res.json(producto);
  } else {
    res.json({ error: `El producto con el ${id} es inexistente` });
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
