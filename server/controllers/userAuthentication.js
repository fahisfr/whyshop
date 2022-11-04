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
          localField: "cart.productID",
          as: "info",
        },
      },
      {
        $set: {
          cart: {
            $mergeObjects: ["$cart", { $arrayElemAt: ["$info", 0] }],
          },
        },
      },
      {
        $group: {
          _id: null,
          cart: { $push: "$cart" },
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
