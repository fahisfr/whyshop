import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import roles from "../helper/roles";

const user = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  role: {
    type: String,
    enum: Object.values(roles),
    default: roles.user,
  },

  createAt: { type: Date, immutable: true, default: () => new Date() },
  updateAt: { type: Date, default: () => new Date() },
  cart: [
    {
      productId: { type: ObjectId },
      selectedQuantity: { type: Number, default: 1 },
      _id: false,
    },
  ],
  orders: [{ type: ObjectId }],
  password: { type: String, required: true },
});

export default mongoose.model("users", user);
