import { JwtUserInfo } from "./../helper/interfaces";
import dbUser from "../dbSchemas/user";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../utils/jwtToken-utils";
import { Request, Response, NextFunction } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { number, password } = req.body;
  const user = await dbUser.findOne({ number });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const userInfo: JwtUserInfo = {
    id: user._id,
    number: user.number,
    role: user.role,
  };

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      status: "error",
      message: "Please check your number and password",
    });
  }

  const { accessToken, refreshToken } = createJwtToken(userInfo);

  res.json({ accessToken, refreshToken });
};
