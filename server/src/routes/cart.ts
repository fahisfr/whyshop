import { Router } from "express";
import PlaceOrder from "../controllers/placeOrder";
import * as cartController from "../controllers/cart";
import {
  apiValidation,
  changeCartProductQuantity,
  placeOrder,
} from "../middlewares/apiValidation";

const router: Router = Router();

router.put("/add-to-cart/:id", cartController.addToCart);
router.put(
  "/change-quantity",
  apiValidation(changeCartProductQuantity),
  cartController.changeProductQuantity
);
router.put("/remove-product/:id", cartController.removeCartProduct);
router.delete("/remove-all-products", cartController.removeAllCartProducts);


export default router;
