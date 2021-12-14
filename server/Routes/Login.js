var express = require('express')
var router = express.Router()
var LoginController=require('../Controllers/UserController/LoginController')


router.post('/',LoginController)



module.exports = router