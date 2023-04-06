import { Request, Response, NextFunction } from "express";

import dbUser from "../dbSchemas/user";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productAdded = await dbUser.updateOne(
      { _id: req.user.id },
      {
        $addToSet: {
          cart: {
            productId: req.params.id,
            selectedQuantity: 1,
          },
        },
      }
    );

    if (productAdded.modifiedCount > 0) {
      return res.json({ message: "Product added to cart" });
    }

    res.status(500).json({ message: "Failed to add product to cart" });
  } catch (err) {
    next(err);
  }
};

export const changeProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user: { id },
      body: { quantity, productId },
    } = req;

    const dbResponse = await dbUser.updateOne(
      { _id: id },
      {
        $inc: {
          "cart.$[ind].selectedQuantity": quantity,
        },
      },
      {
        arrayFilters: [{ "ind.productId": productId }],
      }
    );

    if (dbResponse.modifiedCount > 0) {
      return res.json({ message: "Product quantity updated" });
    }


    res.status(500).json({ message: "Failed to update product quantity" });
  } catch (error) {
    next(error);
  }
};

export const removeCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbResponse = await dbUser.updateOne(
      {
        _id: req.user?.id,
      },
      {
        $pull: {
          cart: {
            productId: req.params.id,
          },
        },
      }
    );

    if (dbResponse.modifiedCount > 0) {
      return res.json({
        message: "Product removed from cart",
      });
    }

    res.status(500).json({ message: "Failed to remove product from cart" });
  } catch (error) {
    next(error);
  }
};

export const removeAllCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbResponse = await dbUser.updateOne(
      { _id: req.user.id },
      {
        $set: {
          cart: [],
        },
      }
    );
    if (dbResponse.modifiedCount > 0) {
      return res.json({
        message: "All products removed from cart",
      });
    }
    res.status(500).json({ message: "Failed to remove products from cart" });
  } catch (error) {
    next(error);
  }
};
