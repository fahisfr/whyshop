const express = require("express");
const router = express.Router();

const GetProduct = require("../controllers/getProduct");
const GetAllProducts = require("../controllers/getAllProducts");

router.get("", GetAllProducts);
router.get("/:name", GetProduct);

module.exports = router;
