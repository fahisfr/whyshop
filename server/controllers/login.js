const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");
const bcrypt = require("bcryptjs");
const ApiErrors = require("../config/apiErrors");
const handleLogin = async (req, res, next) => {
  try {
    const { number, password } = req.body;
    const user = await dbUser.findOne({ number: number }).exec();
    if (!user) res.json({ success: false, message: "Invalid Number" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const accesstoken = jwt.sign(
          { name: user.name, number: user.number, id: user._id, role: user.role },
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
        res.cookie("refreshtoken", refreshtoken, {
          maxAge: 806400000,
          sameSite: "strict",
        });
        res.json({
          success: true,
          message: "Login Successful ",
          accesstoken: accesstoken,
          UserInfo: {
            id: user._id,
            name: user.name,
            number: user.number,
            role: user.role,
          },
        });
      } else {
        res.json({ success: false, message: "Invalid Password" });
      }
    });
  } catch (err) {
    next(ApiErrors.InternalServerError(err.message));
  }
};

module.exports = handleLogin;