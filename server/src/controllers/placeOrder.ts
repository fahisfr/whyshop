import { IProduct } from "../helper/interfaces";
import { Request, Response, NextFunction } from "express";
import Razorpay from "razorpay";
import dbUser from "../dbSchemas/user";
import dbOrder from "../dbSchemas/order";
import dbProduct from "../dbSchemas/product";
import dbPendingOrder from "../dbSchemas/pendingOrder";
import { Types } from "mongoose";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

interface ICartInfo {
  products: IProduct[];
  totalPrice: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { paymentType, address } = req.body;
    const cartInfo = await getCartInfo(userId);

    const { products, totalPrice }: ICartInfo = cartInfo[0];

    const order = {
      userId,
      paymentType: paymentType,
      products,
      totalPrice,
      address,
    };
    if (paymentType === "online") {
      const newPendingOrder = await dbPendingOrder.create(order);

      const createOrder = await instance.orders.create({
        amount: totalPrice * 100,
        currency: "INR",
        receipt: newPendingOrder._id.toString(),
        payment_capture: true,
      });
      newPendingOrder.paymentId = createOrder.id;
      newPendingOrder.save();

      if (!createOrder) {
        res.status(500).json({
          message:
            "Sorry, we were unable to process your order. Please try again later",
        });
      }
      const razorpayOrder = {
        key: "rzp_test_lFLdi5y9B4LWvU",
        amount: newPendingOrder.totalPrice,
        currency: "INR",
        name: "whyshop",
        order_id: newPendingOrder._id,
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          email: "fahiscodes@gmail.com",
          contact: order.address.number,
        },
      };
      return res.json({ order: razorpayOrder, loadRazorPay: true });
    }

    const userOrder = await dbOrder.create(order);
    if (!userOrder) {
      return res.status(500).json({
        message:
          "Sorry, we were unable to process your order at this time. Please try again later",
      });
    }
    const dbBulk = dbProduct.collection.initializeUnorderedBulkOp();

    products.forEach((product) => {
      dbBulk.find({ _id: product._id }).updateOne({
        $inc: {
          quantity: -product.quantity,
        },
      });
    });

    await dbBulk.execute(),
      await dbUser.updateOne(
        { _id: userId },
        {
          $set: { cart: [] },
          $push: {
            orders: userOrder._id,
          },
        }
      ),
      res.json({ message: "order Placed Puccessfully", loadRazorPay: false, });
  } catch (error) {
    next(error);
  }
};

const getCartInfo = async (userId: string) => {
  return await dbUser.aggregate<ICartInfo>([
    {
      $match: {
        _id: new Types.ObjectId(userId),
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
          imageName: 1,
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
};
