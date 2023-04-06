import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  imageName: String,
});

export default mongoose.model("banners", ProductSchema);
