import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["naked", "pista", "sportTouring", "trail", "scrambler"],
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
});

export const ProductModel = new mongoose.model("Product", ProductSchema);
