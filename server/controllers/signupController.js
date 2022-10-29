const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");
const bcrept = require("bcryptjs");

const CareateUser = async (req, res, next) => {
  try {
    const { name, number, password } = req.body;
    userIn = await dbUser.findOne({ number: number }).exec();
    if (userIn) return res.json({ success: false, message: "User already exist" });
    bcrept.hash(password, 12).then(async (bcreptpassword) => {
      const newUser = await dbUser.create({
        name: name,
        number: number,
        password: bcreptpassword,
      });

      const accesstoken = jwt.sign(
        { name: newUser.name, number: newUser.number, id: newUser._id, role: newUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3m" }
      );

      const refreshtoken = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      newUser.refreshToken = refreshtoken;
      newUser.save();
      res.cookie("refreshtoken", refreshtoken, {
        maxAge: 806400000,
        httpOnly: true,
        secure: true,
      });
      res.json({
        status: true,
        message: "Login Successful ",
        accesstoken: accesstoken,
        UserInfo: {
          id: newUser._id,
          name: newUser.name,
          number: newUser.number,
          role: newUser.role,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = CareateUser;
