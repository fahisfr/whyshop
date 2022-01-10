const express = require('express')
const router  = express.Router()

const userAuthentication = require('../Controllers/JWTController/UserAuthentication')


router.get('/', userAuthentication )



module.exports = router