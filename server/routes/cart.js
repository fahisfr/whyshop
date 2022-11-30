/** @format */

const express = require("express");

const router = express.Router();
const AddToCart = require("../controllers/addToCart");
const CartChanges = require("../controllers/cartChanges");
const PlaceOrder = require("../controllers/placeOrder");
const {
  apiValidation,
  changeCartProductQuantity,
  placeOrder,
} = require("../config/apiValidation");

router.put("/add-to-cart/:id", AddToCart);
router.put(
  "/change-quantity",
  apiValidation(changeCartProductQuantity),
  CartChanges.changeProductQuantity
);
router.put("/remove-product/:id", CartChanges.removeCartProduct);
router.delete("/remove-all-products", CartChanges.removeAllCartProducts);
router.post("/place-order", apiValidation(placeOrder), PlaceOrder);

module.exports = router;
