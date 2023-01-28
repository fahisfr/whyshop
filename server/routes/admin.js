const express = require("express");
const Role = require("../config/roles");
const route = express.Router();

const Rolemiddleware = require("../middlewares/roleAuth");
const GetOrdersInfo = require("../controllers/getUsersOrders");
const ChangeOrderStatus = require("../controllers/changeOrderStatus");
const productController = require("../controllers/product");

const {
  apiValidation,
  addProduct,
  editProduct,
} = require("../config/apiValidation");

route.get(
  "/orders",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  GetOrdersInfo
);
route.put(
  "/order/change-status/:id",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  ChangeOrderStatus
);
route.post(
  "/addproduct",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  apiValidation(addProduct),
  productController.addProduct
);
route.put(
  "/editproduct/:id",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  apiValidation(editProduct),
  productController.editProduct
);

module.exports = route;
