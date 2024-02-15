import { ProductModel } from "../models/product.model.js";

export class MongoProductManager {
  addProduct = async (product) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status = true,
        category,
      } = product;
      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !stock ||
        !status ||
        !category
      )
        throw new Error("Completa todos los campos requeridos");
      const newProduct = await ProductModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProducts = async (limit) => {
    try {
      if (limit) {
        const limitedProducts = await ProductModel.find({}).limit(limit).lean();
        if (limitedProducts.length === 0)
          throw new Error("No se pudo encontrar ningun producto");
        return limitedProducts;
      }
      const products = await ProductModel.find({}).lean();
      if (products.length === 0)
        throw new Error("No se pudo encontrar ningun producto");
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProductsById = async (id) => {
    try {
      const product = await ProductModel.findById(id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProduct = async (id, product) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status = true,
        category,
      } = product;

      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) throw new Error("Producto no encontrado");

      if (title) existingProduct.title = title;
      if (description) existingProduct.description = description;
      if (price) existingProduct.price = price;
      if (thumbnail) existingProduct.thumbnail = thumbnail;
      if (code) existingProduct.code = code;
      if (stock) existingProduct.stock = stock;
      if (status !== undefined) existingProduct.status = status;
      if (category) existingProduct.category = category;

      const updateProduct = await existingProduct.save();
      return updateProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) throw new Error("Producto no encontrado");
      return "Producto eliminado con exito";
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
