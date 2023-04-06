import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import dbOrder from "../dbSchemas/order";
import dbUser from "../dbSchemas/user";

export const getUserOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await dbOrder.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.log("hello");

    next(error);
  }
};

export const changeOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, orderStatus } = req.body;
    const orderStatusChanged = await dbOrder.updateOne(
      { _id: id },
      { $set: { orderStatus } }
    );
    if (orderStatusChanged.modifiedCount > 0) {
      return res.json({ message: "Order status updated successfully" });
    }
    res.status(500).json({ message: "Failed to change order status" });
  } catch (error) {
    next(error);
  }
};

// Get all orders for a single user
export const getUserallOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await dbUser.aggregate([
      { $match: { _id: new ObjectId(req.user.id) } },
      { $project: { orders: 1 } },
      { $unwind: { path: "$orders", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "orders",
          foreignField: "_id",
          localField: "orders",
          as: "order",
        },
      },
      { $set: { order: { $arrayElemAt: ["$order", 0] } } },
      { $group: { _id: null, orders: { $push: "$order" } } },
    ]);
    if (orders.length === 0) {
      return res.status(404).json({ message: "User orders not found" });
    }
    res.json(orders[0].orders);
  } catch (error) {
    next(error);
  }
};

// Get all orders for all users
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await dbOrder.find({});
    if (orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

export const getOrdersHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const days: number = Number(req.query.days);
    let format = "%Y-%m-%d";
    if (days > 30) {
      format = "%Y-%m";
    }
    const ordersHistory = await dbOrder.aggregate([
      {
        $match: {
          orderAt: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - days)),
          },
        },
      },
      {
        $project: {
          orderAt: {
            $dateToString: {
              format: format,
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
    res.json({ orders: ordersHistory });
  } catch (error) {
    next(error);
  }
};
