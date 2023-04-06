import { Types } from "mongoose";
import { JwtUserInfo } from "./../helper/interfaces";
import dbUser from "../dbSchemas/user";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../utils/jwtToken-utils";
import { Response, Request, NextFunction } from "express";

export const AuthenticationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, role, id } = req.user;
    const userInfo = await getUserInfo(id);
    console.log(req.user);

    if (userInfo.length === 0) {
      return res.status(404).json({ message: "faild to found userInfo" });
    }

    const user = {
      number,
      role,
      cart: userInfo[0].cart,
    };
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, password } = req.body;
    const user = await dbUser.findOne({ number: number }).exec();
    if (!user) {
      return res.status(400).json({ message: "Invalid Number" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "The phoneNumber or password is incorrect",
      });
    }
    const userInfo: JwtUserInfo = {
      id: user._id,
      number: user.number,
      role: user.role,
    };
    const { accessToken, refreshToken } = createJwtToken(userInfo);
    res.cookie("whyshop_refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.json({
      accessToken,
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, number, password } = req.body;
    const userIn = await dbUser.findOne({ number: number });
    if (userIn) {
      return res.status(400).json({
        error: "This phone number is already registered",
      });
    }
    const bcryptPassword = await bcrypt.hash(password, 12);
    const newUser = await dbUser.create({
      name: name,
      number: number,
      password: bcryptPassword,
    });
    const userInfo = {
      id: newUser._id,
      number: newUser.number,
      role: newUser.role,
    };
    const { accessToken, refreshToken } = createJwtToken(userInfo);
    res.cookie("whyshop_refreshToken", refreshToken, {
      maxAge: 900000,
    });
    res.json({
      accessToken,
      userInfo,
    });
  } catch (err) {
    next(err);
  }
};

export const reAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies?.whyshop_refreshtoken;
    if (!cookie) {
      return res.status(400).json({ message: "No token provided." });
    }
    // jwt.verify(
    //   cookie,
    //   REFRESH_TOKEN_SECRET!,
    //   async (err, decoded : ) => {
    //     if (decoded) {
    //       const { accessToken } = createJwtToken(decoded);
    //       return res.json({
    //         accessToken,
    //         userInfo,
    //       });
    //     }
    //     res.status(400).json({ message: "Refreshtoken not valid" });
    //   }
    // );
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await dbUser.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await dbUser.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, id } = req.body;
    const roleIn = false;
    if (!roleIn) {
      return res.status(400).json({ message: "unknown role" });
    }
    if (id === req.user.id) {
      return res.json({
        status: "ok",
        message: "you can't change your role :)",
      });
    }
    const updateRole = await dbUser.updateOne(
      { _id: id },
      { $set: { role: roleIn } }
    );
    if (updateRole.modifiedCount > 0) {
      return res.json({ status: "ok" });
    }
    res.status(500).json({ message: "failed to update user role" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("whyshop_refreshToken");
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = (userId: string) => {
  return dbUser.aggregate([
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
          _id: 1,
          name: 1,
          price: 1,
          imageName: 1,
          selectedQuantity: "$cart.selectedQuantity",
          quantity: 1,
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
};
