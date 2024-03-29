import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  orderAt: { type: Date, default: Date.now, required: true },
  paymentType: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      imageName: { type: String, required: true },
      total: { type: Number, required: true },
    },
  ],
  address: {
    name: { type: String, required: true },
    number: { type: String, required: true },
    city: { type: String, required: true },
    lademark: { type: String },
    _id: false,
  },
  totalPrice: { type: Number, required: true },
  paymentId: { type: String, default: null },
  orderStatus: {
    type: String,
    cum: ["processing", "packed", "out for delivery", "delivered"],
    default: "processing",
  },
});

export default mongoose.model("orders", OrderSchema);
