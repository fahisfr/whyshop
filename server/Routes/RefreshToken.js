const express = require('express')
const router = express.Router()

const RefreshToken = require('../Controllers/JWTController/VerifyRefreshToken')


router.get('/',RefreshToken)



module.exports = router