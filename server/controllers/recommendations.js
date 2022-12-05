/** @format */

const dbOrder = require("../dbSchemas/order");

const recommendations = async (req, res, next) => {
  try {
    const dbResult = await dbOrder.aggregate([
      {
        $facet: {
          pepoleBuying: [
            {
              $match: {},
            },
            {
              $project: {
                products: 1,
              },
            },
            {
              $unwind: "$products",
            },

            {
              $group: {
                _id: "$products._id",
                totalQuantity: {
                  $sum: "$products.quantity",
                },
              },
            },
            {
              $sort: {
                totalQuantity: -1,
              },
            },
            {
              $lookup: {
                from: "products",
                foreignField: "_id",
                localField: "_id",
                as: "product",
              },
            },
            {
              $set: {
                product: { $arrayElemAt: ["$product", 0] },
              },
            },
            {
              $replaceWith: "$product",
            },
          ],
          recommendedForYou: [
            {
              $limit: 1,
            },
            {
              $lookup: {
                from: "products",
                pipeline: [
                  {
                    $sort: {
                      quantity: -1,
                    },
                  },
                  {
                    $limit: 15,
                  },
                ],
                as: "recommend",
              },
            },
            {
              $project: {
                recommend: 1,
              },
            },
            {
              $unwind: {
                path: "$recommend",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $replaceWith: "$recommend",
            },
          ],
        },
      },
    ]);

    const data = Object.keys(dbResult[0]).map((item) => {
      return {
        title: item,
        products: dbResult[0][item],
      };
    });

    res.json({ status: "ok", recommendations: data });
  } catch (error) {
    next(error);
  }
};

module.exports = recommendations;
