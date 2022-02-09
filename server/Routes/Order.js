const express = require('express')
const router = express.Router()

const OrderController = require('../Controllers/VerifyPayment')
const GetOrderInfo    = require('../Controllers/GetOrderInfo')

router.get('/', GetOrderInfo)
router.post('/verifypayment',OrderController)



module.exports = router