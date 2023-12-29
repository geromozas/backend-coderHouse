class Product {
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

class ProductManager {
  static proxIdProduct = 1;
  products;

  constructor() {
    this.products = [];
  }
  static getIdForNewProduct() {
    return ProductManager.proxIdProduct++;
  }
  addProduct(data) {
    const { title, description, price, thumbnail, code, stock } = data;

    const productExist = this.products.find((p) => p.code === code);

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Debe llenar todos los campos");
    } else if (productExist) {
      console.log(`El producto con el codigo ${code} ya existe`);
    } else {
      const idProduct = ProductManager.getIdForNewProduct();
      const product = new Product({ id: idProduct, ...data });
      this.products.push(product);
    }
  }
  getProducts() {
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
}

const manejadorDeProductos = new ProductManager();
manejadorDeProductos.addProduct({
  title: "Dominar 250",
  description: "naked",
  price: 4000,
  thumbnail: "./img/domi250",
  code: "moto01",
  stock: 5,
});

manejadorDeProductos.addProduct({
  title: "Kawasaki Z400",
  description: "naked",
  price: 8000,
  thumbnail: "./img/kawa-z400",
  code: "moto02",
  stock: 3,
});
manejadorDeProductos.addProduct({
  title: "Kawasaki Z650",
  description: "naked",
  price: 12000,
  thumbnail: "./img/kawa-z650",
  code: "moto03",
  stock: 1,
});
console.log(manejadorDeProductos.getProducts());
console.log(manejadorDeProductos.getProductById(2));
