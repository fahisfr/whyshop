/** @format */

const express = require("express");
const router = express.Router();

const GetCartInfo = require("../controllers/getCartInfo");
const AddToCart = require("../controllers/addToCart");
const CartChanges = require("../controllers/cartChanges");
const PlaceOrder = require("../controllers/placeOrder");
const ApiValidation = require("../apiValidations/apiValidation");
const APIValidation = require("../apiValidations/apiValidation");

// router.get("/", GetCartInfo.getCartProductsInfo);
router.put("/add-to-cart/:id", AddToCart);
router.put(
  "/change-quantity/",
  APIValidation.CartProductQuantityAPIValidation,
  CartChanges.changeProductQuantity
);
router.put("/remove-product/:id", CartChanges.removeCartProduct);
router.delete("/remove-all-products", CartChanges.removeAllCartProducts);
router.post("/place-order", ApiValidation.PlaceOrderAPIValidation, PlaceOrder);

module.exports = router;
