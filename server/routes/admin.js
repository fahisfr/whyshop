const express = require("express");
const Role = require("../config/roles");
const route = express.Router();

const Rolemiddleware = require("../middlewares/roleAuth");
const ApiValidation = require("../apiValidations/apiValidation");
const AdminController = require("../controllers/addProduct");
const GetOrdersInfo = require("../controllers/getUsersOrders");
const ChangeOrderStatus = require("../controllers/changeOrderStatus");
const EditeProduct = require("../controllers/editProduct");

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
  ApiValidation.AddProductAPIValidation,
  AdminController
);
route.put(
  "/editproduct/:id",
  Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),
  ApiValidation.EditProductAPIValidation,
  EditeProduct
);

module.exports = route;
