

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.json({ status: "error", error: "Opps! something went wrong" });
};
module.exports = errorHandler;
