import express from "express";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { dataBaseConnection } from "./dao/db/index.js";
import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { MongoProductManager } from "./dao/mongoManagers/mongoProductManager.js";

//FileSystem
// import { ProductManager } from "./productManager.js";
// import { CartManager } from "./cartManager.js";
// export const productManager = new ProductManager();
// export const cartManager = new CartManager();

const app = express();
const PORT = 8080;
const server = createServer(app);

export const mongoProductManager = new MongoProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//HANDLEBARS
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

//SOCKET
export const io = new Server(server);

server.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  dataBaseConnection();
});
