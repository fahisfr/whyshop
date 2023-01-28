const express = require("express");
const router = express.Router();
const userControler = require("../controllers/user");
const isAuth = require("../middlewares/userAuthentication");

router.get("/", isAuth, userControler.AuthenticationController);
router.get("/orders", isAuth, require("../controllers/getUserOrders"));
router.get("/refresh-token", userControler.reAuth);

module.exports = router;
