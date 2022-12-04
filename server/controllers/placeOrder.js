
const Razorpay = require("razorpay");
const dbUser = require("../dbSchemas/user");
const dbOrder = require("../dbSchemas/order");
const dbProduct = require("../dbSchemas/product");
const objectId = require("mongoose").Types.ObjectId;
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PlaceOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { paymentType } = req.body;
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
          localField: "productId",
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
            quantity: "$quantity",
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
            $push: "$product",
          },
        },
      },
    ]);

    const { products, totalPrice } = cartInfo[0];

    const userOrder = await dbOrder.create({
      userId,
      paymentType: paymentType ? "online" : "cod",
      products,
      totalPrice,
      address: {
        name: req.body.name,
        number: req.body.number,
        lademark: req.body.lademark,
        city: req.body.city,
      },
    });

    if (paymentType === "cod") {
      if (!userOrder) {
        return res.json({ status: "error", message: "order faild" });
      }
      const dbBulk = await dbProduct.collection.initializeUnorderedBulkOp();

      products.forEach((product) => {
        dbBulk.find({ _id: product._id }).updateOne({
          $inc: {
            quantity: -product.quantity,
          },
        });
      });
      Promise.all([
        dbBulk.execute(),
        dbUser.updateOne(
          { _id: userId },
          {
            $set: { cart: [] },
            $push: {
              orders: userOrder._id,
            },
          }
        ),
      ]);
      res.json({ status: "ok", message: "Order Placed Puccessfully" });
    } else if (paymentType === "online") {
      const createOrder = await instance.orders.create({
        amount: totalPrice * 100,
        currency: "INR",
        receipt: userOrder._id,
        payment_capture: 1,
      });
      userOrder.paymentID = createOrder.id;
      userOrder.save();
      if (createOrder) {
        return res.json({
          status: "razorpay",
          message: "Order Placed Puccessfully",
          order: createOrder,
        });
      }
      res.json({ status: "error", message: "create order filed try again" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = PlaceOrder;
