var express = require('express')
var router = express.Router()
var userAuthentication = require('../Controllers/JWTController/UserAuthentication')


router.get('/', userAuthentication )



module.exports = router