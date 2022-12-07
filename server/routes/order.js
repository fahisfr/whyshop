const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/verifyPayment");



router.post("/verifypayment", OrderController);

module.exports = router;
