const express = require('express')
const router = express.Router()


const RefreshToken       = require('../Controllers/VerifyRefreshToken')
const userAuthentication = require('../Controllers/UserAuthentication')


router.get('/', userAuthentication)
router.put('/refreshtoken', RefreshToken)



module.exports = router