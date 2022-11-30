const Order = require("../dbSchemas/order");
const objectid = require("mongodb").ObjectId;

const GetOrderInfo = async (req, res) => {
  const UserID = req.user.id;
  Order.find({ userID: UserID }, { paymentID: 0, userID: 0 })
    .then((order) => {
      res.json({ status: true, message: "Order List", order: order, orders: true });
    })
    .catch((err) => {
      res.status(400).json({ message: "no order found" });
    });
};
module.exports = GetOrderInfo;
