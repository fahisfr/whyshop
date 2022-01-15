const express = require('express')
const router  = express.Router()

const GetProduct     =require('../Controllers/ProductController/GetOneProduct')
const GetAllProducts = require('../Controllers/ProductController/GetAllProducts')

router.get('',GetAllProducts)
router.get('/:id', GetProduct)



module.exports = router