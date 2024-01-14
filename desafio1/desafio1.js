class ProductManager {
  constructor() {
    this.products = []; //porque va this.?
    this.id = 1;
  }
  products = []; //?

  addProduct(product) {
    //porque va product en el ()
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return; //para que corte la ejecución
    }
    if (this.products.some((p) => p.code == product.code)) {
      console.log(`El producto con el code ${product.code} ya existe`);
      return;
    }
    product.id = this.id++; //porque va this
    this.products.push(product);
    console.log(`Se ha añadido un producto con el code ${product.code}`);
  }
  getProducts() {
    return this.products;
  }
  getProductsById(id) {
    const product = this.products.find((p) => p.id == id);
    if (!product) {
      console.log(`NOT FOUND. El producto con el id ${id} no se ha encontrado`);
      return;
    }
    return product;
  }
}

//agregar productos
const product = new ProductManager();
product.addProduct({
  title: "Bajaj dominar 400",
  description: "naked",
  price: 5500,
  thumbnail: "ruta1",
  code: "m1",
  stock: 8,
});
product.addProduct({
  title: "Kawasaki z650",
  description: "naked",
  price: 13500,
  thumbnail: "ruta2",
  code: "m2",
  stock: 4,
});
product.addProduct({
  title: "Ducati monster 797",
  description: "naked",
  price: 18000,
  thumbnail: "ruta3",
  code: "m3",
  stock: 2,
});
console.log(product.getProducts());
product.getProductsById(5);
