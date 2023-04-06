import dbBanner from "../dbSchemas/banner";
import { Request, Response, NextFunction } from "express";

export const getHomeInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const home = await dbBanner.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: null,
          banners: {
            $push: "$imageName",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          pipeline: [{ $match: {} }],
          as: "categories",
        },
      },
    ]);


    res.json(home[0]);
  } catch (error) {
    next(error);
  }
};

