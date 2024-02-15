import { CartModel } from "../models/cart.model.js";

export class MongoCartManager {
  createCart = async () => {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getCartProducts = async (id) => {
    try {
      const products = await CartModel.findOne({ _id: id }).select("products");
      if (!products) throw new Error("No se pudo conseguir ningun producto");
      return products.products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProductToCart = async (cart_id, product_id, quatity = 10) => {
    try {
      const existingCart = await CartModel.findById(cart_id);
      if (!existingCart) throw new Error("No se encontro el carrito");

      const newProduct = { product_id: product_id, quatity };
      existingCart.products.push(newProduct);

      await existingCart.save();
      return existingCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
