import express from "express";
import { Router } from "express";
import Rolemiddleware from "../middlewares/roleAuth";
import * as productController from "../controllers/product";
import * as orderController from "../controllers/order";
import * as userController from "../controllers/user";
import * as adminController from "../controllers/admin";
import {
  apiValidation,
  addProduct,
  editProduct,
} from "../middlewares/apiValidation";
import getAdminDashBoard from "../controllers/getAdminDashBord";

const router: Router = express.Router();

router.get("/all-users", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.put("/user/change-role", userController.changeUserRole);
router.put("/order/change-order-status", orderController.changeOrderStatus);
router.get("/dashboard", getAdminDashBoard);
router.post("/login", adminController.login);
router.post(
  "/product/add-product",
  apiValidation(addProduct),
  productController.addProduct
);
router.put(
  "/product/edit-product/:id",
  apiValidation(editProduct),
  productController.editProduct
);
router.delete("/product/:id", productController.deleteProductById);

export default router;
