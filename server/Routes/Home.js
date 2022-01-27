const express = require('express')
const router  = express.Router()

const ProductTypes = require('../Controllers/HomeController/GetProductTypes')

router.get('/',ProductTypes)

module.exports = router