import { promises as fs } from "fs";

class Product {
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    (this.id = id) || ProductManager.getIdForNewProduct();
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

export class ProductManager {
  static proxIdProduct = 1;
  products;

  constructor() {
    this.ruta = './products.json';
    this.products = [];
  }

  async init() {
    await this.writeProducts();
  }

  static getIdForNewProduct() {
    return ProductManager.proxIdProduct++;
  }

  async readProducts() {
    const productsInJson = await fs.readFile(this.ruta, "utf-8");
    this.products = JSON.parse(productsInJson);
  }

  async writeProducts() {
    await fs.writeFile(this.ruta, JSON.stringify(this.products));
  }

  async addProduct(data) {
    const { title, description, price, thumbnail, code, stock } = data;

    const productExist = this.products.find((p) => p.code === code);

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Debe llenar todos los campos");
    } else if (productExist) {
      console.log(`El producto con el codigo ${code} ya existe`);
    } else {
      const idProduct = ProductManager.getIdForNewProduct();
      const product = new Product({ id: idProduct, ...data });
      await this.readProducts();
      this.products.push(product);
      await this.writeProducts();
    }
  }
  async getProducts() {
    await this.readProducts();
    return this.products;
  }
  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Noy found");
    }
  }
  async updateProduct( id, {...data }) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = new Product({ id, ...data });
      await this.writeProducts();
    } else {
      console.log("Producto no encontrado");
    }
  }
  async deleteProduct( id ) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      await this.writeProducts();
    }
  }
}

async function main() {
  const manejadorDeProductos = new ProductManager("productos.json");
  manejadorDeProductos.init();
  await manejadorDeProductos.addProduct({
    title: "Dominar 250",
    description: "naked",
    price: 4000,
    thumbnail: "./img/domi250",
    code: "moto01",
    stock: 5,
  });

  await manejadorDeProductos.addProduct({
    title: "Kawasaki Z400",
    description: "naked",
    price: 8000,
    thumbnail: "./img/kawa-z400",
    code: "moto02",
    stock: 3,
  });
  await manejadorDeProductos.addProduct({
    title: "Kawasaki Z650",
    description: "naked",
    price: 12000,
    thumbnail: "./img/kawa-z650",
    code: "moto03",
    stock: 1,
  });
  // console.log(await manejadorDeProductos.getProducts());
  // console.log(await manejadorDeProductos.getProductById(2));
  // console.log(await manejadorDeProductos.deleteProduct({ id: 3 }));
  // console.log(
  //   await manejadorDeProductos.updateProduct({
  //     id: 2,
  //     title: "Kawasaki Z400",
  //     description: "naked",
  //     price: 7500,
  //     thumbnail: "./img/kawa-z400",
  //     code: "moto02",
  //     stock: 2,
  //   })
  // );
}

main();
