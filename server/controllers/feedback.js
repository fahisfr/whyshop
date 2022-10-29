const dbFeedback = require("../dbSchemas/feedback");
const ApiErrors = require("../config/apiErrors");

const AddFeedback = async (req, res, next) => {
  try {
    const { name, email, message, subject } = req.body;
    const newFeedback = await dbFeedback.create({ name, email, subject, message });
    if (!newFeedback) return next(ApiErrors.InternalServerError(newFeedback));
    res.json({ success: true, message: "Feedback Added" });
  } catch (error) {
    next(ApiErrors.InternalServerError(error.message));
  }
};

module.exports = AddFeedback;
