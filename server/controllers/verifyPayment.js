/** @format */

const crypto = require("crypto");
const dbOrder = require("../dbSchemas/order");
const dbUser = require("../dbSchemas/user");

const verifyPayment = async (req, res, next) => {
  try {
    const order = req.body.order;
    const hash = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order.razorpay_order_id + "|" + order.razorpay_payment_id)
      .digest("hex");
    if (order.razorpay_signature == hash) {
      Promise.all([
        dbOrder.updateOne(
          { paymentId: order.razorpay_order_id },
          {
            $set: {
              paymentStatus: "paid",
            },
          }
        ),
        dbUser.updateOne(
          { _id: req.user.id },
          {
            $set: {
              cart: [],
            },
           
          }
        ),
      ]).then((res) => {});
      res.json({ status: "ok", message: "Payment Successful" });
      return;
    }
    res.json({ status: "error", error: "Payment Failed" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyPayment;
