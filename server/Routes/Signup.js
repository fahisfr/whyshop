const express = require('express')
const router = express.Router()

const CareateUser   = require('../Controllers/UserController/SignupController')
const APIValidation = require('../APIValidations/APIValidation')

router.post('/',APIValidation.SinupAPIValidation,CareateUser)



module.exports=router