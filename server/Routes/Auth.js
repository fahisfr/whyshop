const express = require('express')
const router = express.Router()


const RefreshToken       = require('../Controllers/AuthController/VerifyRefreshToken')
const userAuthentication = require('../Controllers/AuthController/UserAuthentication')


router.get('/', userAuthentication)
router.put('/refreshtoken', RefreshToken)



module.exports = router