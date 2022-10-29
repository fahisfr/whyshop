const express = require("express");
const router = express.Router();

const GetProduct = require("../controllers/getOneProduct");
const GetAllProducts = require("../controllers/getAllProducts");

router.get("", GetAllProducts);
router.get("/:id", GetProduct);

module.exports = router;
