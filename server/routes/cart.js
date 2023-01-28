const express = require("express");
const router = express.Router();
const PlaceOrder = require("../controllers/placeOrder");
const cartController = require("../controllers/cart");
const {
  apiValidation,
  changeCartProductQuantity,
  placeOrder,
} = require("../config/apiValidation");

router.put("/add-to-cart/:id", cartController.addToCart);
router.put(
  "/change-quantity",
  apiValidation(changeCartProductQuantity),
  cartController.changeProductQuantity
);
router.put("/remove-product/:id", cartController.removeCartProduct);
router.delete("/remove-all-products", cartController.removeAllCartProducts);
router.post("/place-order", apiValidation(placeOrder), PlaceOrder);

module.exports = router;
