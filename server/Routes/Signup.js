var express = require('express')
var router = express.Router()
var CareateUser = require('../Controllers/UserController/SignupController')


router.post('/',CareateUser)



module.exports=router