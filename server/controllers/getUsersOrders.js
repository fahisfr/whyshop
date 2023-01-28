const Orders = require("../dbSchemas/order");

module.exports = async (req, res) => {
  Orders.find({})
    .exec()
    .then((result) => {
      res.json({ status: "ok", orders: result });
    })
    .catch((error) => {
      res.json({ status: "error", message: "Oops! Something went wrong" });
    });
};
