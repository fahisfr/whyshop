/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
  { collection: "categoryes" }
);

const Product = mongoose.model("categoryes", ProductSchema);

module.exports = Product;
