/** @format */

const express = require("express");
const Role = require("../config/roles");
const route = express.Router();

const Rolemiddleware = require("../middlewares/roleAuth");
const AdminController = require("../controllers/addProduct");
const GetOrdersInfo = require("../controllers/getUsersOrders");
const ChangeOrderStatus = require("../controllers/changeOrderStatus");
const EditeProduct = require("../controllers/editProduct");
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
  AdminController
);
route.put(
  "/editproduct/:id",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  apiValidation(editProduct),
  EditeProduct
);

module.exports = route;
