const express = require('express')
const router  = express.Router()

const getProducts = require('../Controllers/ProductController/ShowProductType')
const GetAllProducts = require('../Controllers/ProductController/GetAllProducts')

router.get('',GetAllProducts)
router.get('/:id', getProducts)



module.exports = router