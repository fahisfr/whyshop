/** @format */

const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");
const bcrypt = require("bcryptjs");

const handleLogin = async (req, res, next) => {
  try {
    const { number, password } = req.body;
    const user = await dbUser.findOne({ number: number }).exec();
    if (!user) res.json({ status: "error", error: "Invalid Number" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const accesstoken = jwt.sign(
        {
          name: user.name,
          number: user.number,
          id: user._id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      const refreshtoken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      user.refreshToken = refreshtoken;
      user.save();
      res.cookie("refreshToken", refreshtoken, {
        maxAge: 806400,
        sameSite: "strict",
      });
      return res.json({
        status: "ok",
        message: "login Successful ",
        accesstoken: accesstoken,
        UserInfo: {
          id: user._id,
          name: user.name,
          number: user.number,
          role: user.role,
        },
      });
    }
    res.json({status:"error",error:"The phoneNumber or password is incorrect"})
  } catch (error) {
    next(error);
  }
};

module.exports = handleLogin;
