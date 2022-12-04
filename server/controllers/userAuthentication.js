/** @format */

const dbUser = require("../dbSchemas/user");
const objectId = require("mongoose").Types.ObjectId;

const AuthenticationController = async (req, res, next) => {
  try {
    const dbResult = await dbUser.aggregate([
      {
        $match: {
          _id: objectId(req.user.id),
        },
      },

      {
        $project: {
          cart: 1,
        },
      },
      {
        $unwind: {
          path: "$cart",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "cart.productId",
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
          product: {
            productId: 1,
            name: 1,
            price: 1,
            imageId: 1,
            quantity: "$cart.quantity",
          },
        },
      },
      {
        $group: {
          _id: null,
          cart: { $push: "$product" },
        },
      },
      {
        $set: {
          cart: {
            $cond: [{ $eq: ["$cart", [{}]] }, [], "$cart"],
          },
        },
      },
    ]);

    res.json({
      status: "ok",
      userInfo: {
        ...req.user,
        cart: dbResult[0].cart,
        isAuth: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = AuthenticationController;
