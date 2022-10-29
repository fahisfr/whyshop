const ApiErrors = require("./apiErrors");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiErrors) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
    return;
  }
  res.status(500).json({ status: false, message: "opps! something went wrong" });
};
module.exports = errorHandler;
