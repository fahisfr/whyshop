const jwt = require("jsonwebtoken");
const dbUser = require("../dbSchemas/user");
const bcrypt = require("bcryptjs");
const objectId = require("mongoose").Types.ObjectId;
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const AuthenticationController = async (req, res, next) => {
  try {
    const { name, number, role, id } = req.user;
    const userInfo = await getUserInfo(id);
    res.json({
      status: "ok",
      userInfo: {
        name,
        number,
        role,
        cart: userInfo[0].cart,
        isAuth: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { number, password } = req.body;
    const user = await dbUser.findOne({ number: number }).exec();
    if (!user) res.json({ status: "error", error: "Invalid Number" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: "error",
        error: "The phoneNumber or password is incorrect",
      });
    }

    const userInfo = {
      id: user._id,
      name: user.name,
      number: user.number,
      role: user.role,
    };

    const { accessToken, refreshToken } = createJwtToken(userInfo);

    res.cookie("whyshop_refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return res.json({
      status: "ok",
      accessToken,
      userInfo,
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, number, password } = req.body;
    const userIn = await dbUser.findOne({ number: number });
    if (userIn)
      return res.json({
        status: "error",
        error: "this phome number is already registered",
      });

    const bcryptPassword = await bcrypt.hash(password, 12);
    const newUser = await dbUser.create({
      name: name,
      number: number,
      password: bcryptPassword,
    });

    const userInfo = {
      id: newUser._id,
      name: newUser.name,
      number: newUser.number,
      role: newUser.role,
    };

    const { accessToken, refreshToken } = createJwtToken(userInfo);

    res.cookie("whyshop_refreshToken", refreshToken, {
      maxAge: 900000,
    });
    res.json({
      status: "ok",
      accessToken,
      userInfo,
    });
  } catch (err) {
    next(err);
  }
};

const reAuth = (req, res, next) => {
  try {
    const cookie = req.cookies?.whyshop_refreshtoken;
    if (!cookie)
      return res.json({ status: "error", error: "No token provided." });
    jwt.verify(cookie, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (decoded) {
        const { accessToken } = createJwtToken(decoded);
        return res.json({
          status: "ok",
          accessToken,
          userInfo,
        });
      }
      res.json({ status: "error", message: "refreshtoken not valid" });
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("whyshop_refreshToken");
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

const createJwtToken = (userInfo) => {
  const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(userInfo, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const getUserInfo = (userId) => {
  return dbUser.aggregate([
    {
      $match: {
        _id: objectId(userId),
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
          imageId: 1,
          quantity: "$cart.quantity",
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

module.exports = {
  login,
  signup,
  reAuth,
  AuthenticationController,
  logout,
};
