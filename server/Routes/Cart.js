const express  = require('express')
const router   = express.Router()

const GetCartInfo    =require ('../Controllers/CartController/GetCartInfo')
const AddToCart      = require('../Controllers/CartController/AddToCart')
const CartChanges    = require('../Controllers/CartController/CartChanges')
const PlaceOrder     = require('../Controllers/CartController/PlaceOrder')
const ApiValidation  = require('../APIValidations/APIValidation')
const APIValidation  =require('../APIValidations/APIValidation')

router.get('/', GetCartInfo.getCartProductsInfo)
router.put('/add-to-cart/:id', AddToCart)
router.put('/change-product-quantity/:id', APIValidation.CartProductQuantityAPIValidation, CartChanges.changeProductQuantity)
router.put('/remove-product/:id', CartChanges.removeCartProduct )
router.delete('/remove-all-products', CartChanges.removeAllCartProducts)
router.post('/place-order',ApiValidation.PlaceOrderAPIValidation,PlaceOrder)


module.exports = router