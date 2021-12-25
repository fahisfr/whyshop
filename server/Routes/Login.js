var express = require('express')
var router = express.Router()
var LoginController = require('../Controllers/UserController/LoginController')
// login api valiedation import
var APIValidation = require('../APIValidations/APIValidation')


router.post('/',APIValidation.LoginAPIValidation,LoginController)


module.exports = router