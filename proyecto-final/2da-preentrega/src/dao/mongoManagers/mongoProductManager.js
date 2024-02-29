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

  getProducts = async (limit, page, query, sort) => {
    try {
      let products = await ProductModel.paginate(
        { query },
        { limit, page, lean: true, sort: { price: sort } }
      );
      if (products.docs.length === 0)
        throw new Error("No se encontraron productos");
      return {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}`
          : null,
        nextLink: products.hasNextPage
          ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}`
          : null,
      };
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
