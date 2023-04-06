import dbProduct from "../dbSchemas/product";
import dbUser from "../dbSchemas/user";
import dbOrder from "../dbSchemas/order";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ordersCount = await dbOrder.countDocuments();
    const usersCount = await dbUser.countDocuments();
    const productsCount = await dbProduct.countDocuments();

    const orderHistory = await dbOrder.aggregate([
      {
        $match: {
          orderAt: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      },
      {
        $project: {
          orderAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$orderAt",
            },
          },
          totalPrice: 1,
        },
      },
      {
        $group: {
          _id: "$orderAt",
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const soldProductDetails = await dbProduct.find(
      {},
      { quantitySold: 1, name: 1, _id: 1 }
    );

    return res.json({
      usersCount,
      productsCount,
      ordersCount,
      soldProductDetails,
      orderHistory,
      totalRevenue: 4999,
    });
  } catch (error) {
    next(error);
  }
};
