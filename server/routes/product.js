const express = require("express");
const router = express.Router();
const productControler = require("../controllers/product");

router.get("/get-all-products", productControler.getAllProducts);
router.get("/:name", productControler.GetProdcut);

module.exports = router;
