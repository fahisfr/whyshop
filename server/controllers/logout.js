const express = require("express");
const router = express.Router();

const User = require("../dbSchemas/user");

module.exports = router.delete("", async (req, res,next) => {
  try {
    const FindUser = await User.findById(req.user.id);
    FindUser.refreshToken = null;
    FindUser.save();
    res.clearCookie("refreshToken");
    res.json({
      status: true,
      message: "Logout Successful",
    });
  } catch (error) {
    next(error)
  }
});
