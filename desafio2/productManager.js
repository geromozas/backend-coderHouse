import { promises as fs } from "fs";

class ProductManager {
  static id = 0;

  constructor() {
    this.path = "./products.json";
    this.products = [];
  }

  async writeProducts(array) {
    await fs.writeFile(this.path, JSON.stringify(array));
  }

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    ProductManager.id++;

    let newProduct = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  // readProducts = async () => {
  //   let respuesta = await fs.readFile(this.path, "utf-8");
  //   let respuestaJSON = JSON.parse(respuesta);
  //   return respuestaJSON;
  // };

  getProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    console.log(respuesta);
  };

  getProductsById = async (id) => {
    let respuesta = await this.readProducts();
    const product = respuesta.find((p) => p.id === id);
    if (product) {
      console.log(product);
    } else {
      console.log(`El producto con el id ${id} no existe`);
    }
  };

  updateProduct = async (id, { ...data }) => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    let product = JSON.parse(respuesta);
    const index = product.findIndex((p) => p.id === id);
    if (index !== -1) {
      product[index] = { id, ...data };
      await this.writeProducts(product);
      console.log(`El producto con el id ${id} fue modificado con exito`);
    } else {
      console.log("Producto a modificar no encontrado");
    }
  };

  deleteProductById = async (id) => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    let products = JSON.parse(respuesta);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log(`No existe un producto con el id ${id}`);
    } else {
      products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(products));
      console.log(`El producto con el id ${id} fue eliminado con exito`);
    }
  };
}

const products = new ProductManager();

// products.addProduct({
//   title: "Dominar 400",
//   description: "naked",
//   price: 5500,
//   thumbnail: "./img/domi400",
//   code: "moto01",
//   stock: 5,
// });
// products.addProduct({
//   title: "Kawasaki z650",
//   description: "naked",
//   price: 14000,
//   thumbnail: "./img/z650",
//   code: "moto02",
//   stock: 4,
// });
// products.addProduct({
//   title: "Ducati monster 797",
//   description: "naked",
//   price: 18000,
//   thumbnail: "./img/797",
//   code: "moto03",
//   stock: 2,
// });

// products.getProducts();

// products.getProductsById(1);

// products.updateProduct(3, {
//   title: "Ducati monster 797",
//   description: "naked",
//   price: 17000,
//   thumbnail: "./img/797",
//   code: "moto03",
//   stock: 2,
// });

// products.deleteProductById(2);
