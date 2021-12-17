var express = require('express')
var router = express.Router()
var OrderController = require('../Controllers/OrderController/VerifyPayment')


router.post('/verifypayment',OrderController)



module.exports = router