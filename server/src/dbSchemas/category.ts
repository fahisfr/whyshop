import mongoose from "mongoose";
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
  { collection: "categories" }
);

export default mongoose.model("categories", ProductSchema);
