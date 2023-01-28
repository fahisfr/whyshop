const express = require("express");
const router = express.Router();

router.get("/get-orders", require("../controllers/getUsersOrders"));

module.exports = router;
