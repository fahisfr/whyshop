const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/verifyPayment");
const GetOrderInfo = require("../controllers/getUserOrders");

router.get("/", GetOrderInfo);
router.post("/verifypayment", OrderController);

module.exports = router;
