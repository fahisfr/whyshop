/** @format */

const jwt = require("jsonwebtoken");
const Userdb = require("../dbSchemas/user");

const RefreshTokenController = (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshtoken)
      return res
        .status(401)
        .json({ status: false, message: "No token provided." });
    jwt.verify(
      cookie.refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (decoded) {
          const FindUser = await Userdb.findOne({
            _id: decoded.id,
            refreshToken: cookie.refreshtoken,
          });
          if (!FindUser)
            return res
              .status(400)
              .json({ auth: false, message: "token not valid." });
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
          res.json({
            success: true,
            message: "new accesstoken",
            accesstoken: accessToken,
            UserInfo: {
              name: FindUser.name,
              number: FindUser.number,
              role: FindUser.role,
            },
          });
        } else {
          res
            .status(401)
            .json({ status: false, message: "refreshtoken not valid" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = RefreshTokenController;
