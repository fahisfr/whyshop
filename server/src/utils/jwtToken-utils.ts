import { JwtUserInfo } from "./../helper/interfaces";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const createJwtToken = (userInfo: JwtUserInfo) => {
  const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(userInfo, REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};
export { createJwtToken };
