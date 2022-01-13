const express = require('express')
const router  = express.Router()

const getProducts = require('../Controllers/ShopController/ShowCategory')
const GetAllProducts = require('../Controllers/ProductController/GetAllProducts')

router.get('',GetAllProducts)
router.get('/:id', getProducts)



module.exports = router