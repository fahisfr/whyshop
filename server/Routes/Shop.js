var express = require('express')
var router = express.Router()
var getProducts =require('../Controllers/ShopController/ShowProductType')
router.get('/:id',getProducts)



module.exports = router