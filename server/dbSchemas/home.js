/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: [
    {
      name: {
        type: String,
        required: true,
      },
      imageid: {
        type: String,
        required: true,
      },
    },
  ],
  banners: String,
});

const Product = mongoose.model("home", ProductSchema);

module.exports = Product;
