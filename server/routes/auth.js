const express = require("express");
const router = express.Router();

const RefreshToken = require("../controllers/verifyRefreshToken");
const userAuthentication = require("../controllers/userAuthentication");

router.get("/", userAuthentication);
router.put("/refreshtoken", RefreshToken);

module.exports = router;
