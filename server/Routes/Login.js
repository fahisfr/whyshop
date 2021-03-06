const express  = require('express')
const router   = express.Router()

const LoginController = require('../Controllers/LoginController')
const APIValidation   = require('../APIValidations/APIValidation')


router.post('/',APIValidation.LoginAPIValidation,LoginController)


module.exports = router