import mongoose from "mongoose";

const AddProduct = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantitySold: { type: Number, default: 0 },
    imageName: { type: String },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  },
  { collection: "products" }
);

export default mongoose.model("products", AddProduct);
