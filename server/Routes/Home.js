const express = require('express')
const router  = express.Router()

const ProductTypes = require('../Controllers/GetProductTypes')

router.get('/',ProductTypes)

module.exports = router