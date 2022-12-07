/** @format */

const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");

const RefreshTokenController = (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshtoken)
      return res.json({ status: false, error: "No token provided." });
    jwt.verify(
      cookie.refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (decoded) {
          const FindUser = await dbUser.findOne({
            _id: decoded.id,
            refreshToken: cookie.refreshtoken,
          });
          if (!FindUser)
            return res.json({ status: "error", error: "token not valid." });
          const accessToken = jwt.sign(
            {
              name: FindUser.name,
              number: FindUser.number,
              id: FindUser._id,
              role: FindUser.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );
          return res.json({
            status: "ok",
            accesstoken: accessToken,
            UserInfo: {
              name: FindUser.name,
              number: FindUser.number,
              role: FindUser.role,
            },
          });
        }
        res.json({ status: "error", message: "refreshtoken not valid" });
      }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = RefreshTokenController;
