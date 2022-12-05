
const express = require("express");
const router = express.Router();
const home = require("../controllers/home");
const ProductTypes = require("../controllers/getProductTypes");

router.get("/", ProductTypes);
router.get("/banners", home.getBanners);
router.get("/catgorys", home.getCatgorys);

module.exports = router;
