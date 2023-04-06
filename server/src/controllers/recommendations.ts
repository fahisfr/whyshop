import { Request, Response, NextFunction } from "express";
import dbOrder from "../dbSchemas/order";
import { error, log } from "console";

const recommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbResult = await dbOrder.aggregate([
      {
        $facet: {
          PepoleBuying: [
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
              $match: {
                product: { $ne: null },
              },
            },
            {
              $replaceWith: "$product",
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
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export default recommendations;
