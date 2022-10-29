const Orders = require("../dbSchemas/order");

module.exports = (req, res) => {
  Orders.updateOne({ _id: req.body.id }, { $set: { OrderStatus: req.body.status } })
    .then((result) => {
      res.json({ status: true, message: "Order status updated successfully" });
    })
    .catch((error) => {
      res.json({ status: false, message: "Oops! Something went wrong" });
    });
};
