const Razorpay = require("razorpay");
const dbCart = require("../dbSchemas/cart");
const dbProduct = require("../dbSchemas/product");
const dbOrder = require("../dbSchemas/order");
const GetCartInfo = require("./getCartInfo");
const ApiErrors = require("../config/apiErrors");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PlaceOrder = async (req, res, next) => {
  try {
    //COD stands for Cash on Delivery
    const UserID = req.user.id;
    if (req.body.paymentType === "COD") {
      const userCart = await dbCart.findOne({ userID: req.user.id }).exec();
      if (!userCart) return res.json({ status: false, message: "Cart is empty" });
      const ProductInfo = await Promise.all([
        GetCartInfo.getCartProduct(UserID),
        GetCartInfo.CartProductTolal(UserID),
      ]);
      const userOrder = await dbOrder.create({
        userID: userCart.userID,
        paymentType: "COD",
        products: ProductInfo[0],
        totalPrice: ProductInfo[1],
        address: {
          name: req.body.name,
          number: req.body.number,
          lademark: req.body.lademark,
          city: req.body.city,
        },
      });
      res.json({ status: true, message: "Order Placed Puccessfully" });
      dbProduct
        .aggregate([
          {
            $match: {
              _id: { $in: userCart.products.map((product) => product.productID) },
            },
          },
        ])
        .then((result) => {
          console.log(result);
        });
      // dbProduct.updateMany({ _id: { $in: userCart.products.map(res => res.productID)} },  { quantity:10 } )
      dbCart.deleteOne({ userID: req.user.id }).then((result) => {
        console.log(result);
      });
    } else if (req.body.paymentType === "Online") {
      const userCart = await dbCart.findOne({ userID: req.user.id });
      if (!userCart) return res.json({ status: false, message: "Cart is empty" });
      const ProductInfo = await Promise.all([
        GetCartInfo.getCartProduct(UserID),
        GetCartInfo.CartProductTolal(UserID),
      ]);
      const userOrder = await dbOrder.create({
        userID: userCart.userID,
        paymentType: "Online",
        products: ProductInfo[0],
        totalPrice: ProductInfo[1],
        address: {
          name: req.body.name,
          number: req.body.number,
          lademark: req.body.lademark,
          city: req.body.city,
        },
        paymentID: null,
      });
      instance.orders
        .create({
          amount: ProductInfo[1] * 100,
          currency: "INR",
          receipt: userOrder._id,
          payment_capture: 1,
        })
        .then((orderInfo) => {
          userOrder.paymentID = orderInfo.id;
          userOrder.save();
          res.json({ razorpay: true, message: "Order Placed Puccessfully", order: orderInfo });
        })
        .catch((err) =>
          res.status(500).json({ status: false, message: "create order filed try again" })
        );
    }
  } catch (error) {
    next(ApiErrors.InternalServerError(error));
  }
};

module.exports = PlaceOrder;
