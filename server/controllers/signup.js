/** @format */

const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");
const bcrept = require("bcryptjs");

const CareateUser = async (req, res, next) => {
  try {
    const { name, number, password } = req.body;
    userIn = await dbUser.findOne({ number: number });
    if (userIn)
      return res.json({
        status: "error",
        error: "this phome number is already registered",
      });

    const bcreptPassword = await bcrept.hash(password, 12);
    const newUser = await dbUser.create({
      name: name,
      number: number,
      password: bcreptPassword,
    });

    const accesstoken = jwt.sign(
      {
        name: newUser.name,
        number: newUser.number,
        id: newUser._id,
        role: newUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    const refreshtoken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    newUser.refreshToken = refreshtoken;
    newUser.save();
    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict",
    });
    res.json({
      status: "ok",
      accesstoken: accesstoken,
      UserInfo: {
        id: newUser._id,
        name: newUser.name,
        number: newUser.number,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = CareateUser;
