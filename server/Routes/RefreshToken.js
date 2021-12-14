var express = require('express')
var router = express.Router()
var RefreshToken = require('../Controllers/JWTController/VerifyRefreshToken')


router.get('/',RefreshToken)



module.exports = router