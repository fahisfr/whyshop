const express = require("express");
const router = express.Router();

const ProductTypes = require("../controllers/getProductTypes");

router.get("/", ProductTypes);

module.exports = router;
