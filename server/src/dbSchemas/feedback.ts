import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true, max: 600 },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Feedback", FeedbackSchema);
