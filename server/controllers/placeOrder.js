/** @format */

const Razorpay = require("razorpay");
const dbUser = require("../dbSchemas/user");
const dbProduct = require("../dbSchemas/product");
const dbOrder = require("../dbSchemas/order");
const GetCartInfo = require("./getCartInfo");
const ApiErrors = require("../config/apiErrors");
const objectId = require("mongoose").Types.ObjectId;
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PlaceOrder = async (req, res, next) => {
  try {
    //COD stands for Cash on Delivery
    const userId = req.user.id;

    if (req.body.paymentType === "cod") {
      const cartInfo = await dbUser.aggregate([
        {
          $match: {
            _id: objectId(userId),
          },
        },
        {
          $project: {
            cart: 1,
          },
        },
        {
          $unwind: "$cart",
        },
        {
          $replaceWith: "$cart",
        },

        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $set: {
            product: { $arrayElemAt: ["$product", 0] },
          },
        },
        {
          $project: {
            quantity: 1,
            product: {
              _id: 1,
              name: 1,
              price: 1,
              imageId: 1,
              total: { $multiply: ["$product.price", "$quantity"] },
            },
          },
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: "$product.total",
            },
            products: {
              $push: {
                name: "$product.name",
                price: "$product.price",
                quantity: "$quantity",
                imageId: "$product.imageId",
              },
            },
          },
        },
      ]);
      console.log("hello", cartInfo[0]);
      const newOrder = await dbOrder.create({
        userId,
        paymentType: "COD",
        products: cartInfo.products,
        totalPrice: cartInfo.totalPrice,
        address: {
          name: req.body.name,
          number: req.body.number,
          lademark: req.body.lademark,
          city: req.body.city,
        },
      });
      console.log(newOrder)
      if (!newOrder) {
        return res.json({ status: true, message: "order faild" });
      }

      res.json({ status: true, message: "Order Placed Puccessfully" });
      // dbProduct
      //   .aggregate([
      //     {
      //       $match: {
      //         _id: {
      //           $in: userCart.products.map((product) => product.productID),
      //         },
      //       },
      //     },
      //   ])
      //   .then((result) => {
      //     console.log(result);
      //   });
    } else if (req.body.paymentType === "online") {
      const user = await dbUser.findOne({ userId: req.user.id });

      if (user?.cart?.length > 0)
        return res.json({ status: false, message: "Cart is empty" });
      const ProductInfo = await Promise.all([
        GetCartInfo.getCartProduct(userId),
        GetCartInfo.CartProductTolal(userId),
      ]);
      const userOrder = await dbOrder.create({
        userId: userCart.userId,
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
          res.json({
            razorpay: true,
            message: "Order Placed Puccessfully",
            order: orderInfo,
          });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ status: false, message: "create order filed try again" })
        );
    }
  } catch (error) {
    next(ApiErrors.InternalServerError(error));
  }
};

module.exports = PlaceOrder;
