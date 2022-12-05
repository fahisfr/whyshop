/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  imageName: String,
});

const Product = mongoose.model("banners", ProductSchema);

module.exports = Product;
