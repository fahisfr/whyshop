var express = require('express')
var router = express.Router()
var GetCartInfo =require ('../Controllers/CartController/GetCartInfo')
var AddToCart = require('../Controllers/CartController/AddToCart')
var CartChanges = require ('../Controllers/CartController/CartChanges')

router.get('/', GetCartInfo.getCartProductsInfo)
router.put('/add-to-cart/:id', AddToCart)
router.put('/change-product-quantity/:id', CartChanges.changeProductQuantity)
router.put('/remove-product/:id', CartChanges.removeCartProduct )
router.delete('/remove-all-products', CartChanges.removeAllCartProducts)
router.post('/place-order',)


module.exports = router