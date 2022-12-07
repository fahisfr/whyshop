
const dbUser = require("../dbSchemas/user");
const objectid = require("mongodb").ObjectId;

const GetOrderInfo = async (req, res, next) => {
  try {
    const orders = await dbUser.aggregate([
      {
        $match: {
          _id: objectid(req.user.id),
        },
      },
      {
        $project: {
          orders: 1,
        },
      },
      {
        $unwind: {
          path: "$orders",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "orders",
          foreignField: "_id",
          localField: "orders",
          as: "order",
        },
      },
      {
        $set: {
          order: {
            $arrayElemAt: ["$order", 0],
          },
        },
      },
      {
        $group: {
          _id: null,
          orders: {
            $push: "$order",
          },
        },
      },
    ]);
    res.json({ status: "ok", orders: orders[0].orders });
  } catch (error) {
    next(error);
  }
};
module.exports = GetOrderInfo;
