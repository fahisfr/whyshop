

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.json({ status: "error", message: "opps! something went wrong" });
};
module.exports = errorHandler;
