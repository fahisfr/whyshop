const express = require('express')
const router  = express.Router()

const GetProduct     =require('../Controllers/GetOneProduct')
const GetAllProducts = require('../Controllers/GetAllProducts')

router.get('',GetAllProducts)
router.get('/:id', GetProduct)



module.exports = router