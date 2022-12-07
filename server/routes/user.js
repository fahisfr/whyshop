const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/userAuthentication"));
router.get("/orders", require("../controllers/getUserOrders"))
router.put("/refreshtoken", require("../controllers/verifyRefreshToken"));

module.exports = router;
