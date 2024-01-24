import express from "express";
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import expressHandlebars from "express-handlebars";
import { routerHome } from "./routes/index.js";

const PORT = 8080;
const app = express();

//PUBLIC
// app.use(express.static(__dirname + "/public"));
import path from "path";
const currentDir = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(currentDir, "public")));

//MOTOR DE PLANTILLAS
const handlebars = expressHandlebars.create();
app.engine("handlebars", handlebars.engine); // que motor de plantillas queremos usar y con que libreria la queremos activar
app.set("view engine", "handlebars"); //para que los archivos de la carpeta views sean reconocidos las extensiones handlebars
app.set("views", path.join(currentDir, "../views")); //plantillas

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Routes
app.use("/api", routerHome);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
