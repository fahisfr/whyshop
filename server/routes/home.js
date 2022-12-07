const express = require("express");
const router = express.Router();
const home = require("../controllers/home");

router.get("/banners", home.getBanners);
router.get("/catgorys", home.getCatgorys);

module.exports = router;
