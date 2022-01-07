const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/OrderController/VerifyPayment')
const GetOrderInfo = require('../Controllers/OrderController/GetOrderInfo')

router.get('/', GetOrderInfo)
router.post('/verifypayment',OrderController)



module.exports = router