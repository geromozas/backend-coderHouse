import express from "express";
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import expressHandlebars from "express-handlebars";
import { routerHome } from "./routes/view.router.js";
import { Server } from "socket.io";
import path from "path";
import fs from "fs";
const app = express();

import { fileURLToPath } from "url";
import { dirname } from "path";

import http from "http";
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8080;

//PUBLIC
app.use(express.static(__dirname + "/public"));

//MOTOR DE PLANTILLAS
app.engine("handlebars", expressHandlebars.engine()); // que motor de plantillas queremos usar y con que libreria la queremos activar
app.set("view engine", "handlebars"); //para que los archivos de la carpeta views sean reconocidos las extensiones handlebars
app.set("views", __dirname + "/views"); //plantillas

export const productManager = new ProductManager();
export const cartManager = new CartManager();

// Cargar productos desde el archivo JSON
const productsPath = path.join(__dirname, "models", "products.json");
const productos = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

// Pasar productos a todas las vistas
app.use((req, res, next) => {
  res.locals.productos = productos;
  next();
});

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Routes
app.use("/view", routerHome);

//Socket
const io = new Server(server);
io.on("connection", async (socket) => {
  console.log("User conectado");

  const products = await productManager.getProducts();
  socket.emit("products", products);
});

server.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
