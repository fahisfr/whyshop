var express = require('express')
var router = express.Router()
var CareateUser = require('../Controllers/UserController/SignupController')
var APIValidation = require('../APIValidations/APIValidation')

router.post('/',APIValidation.SinupAPIValidation,CareateUser)



module.exports=router