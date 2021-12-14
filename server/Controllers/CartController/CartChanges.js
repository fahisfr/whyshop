const Carts = require('../../Schemas/Cart')
const objectid = require('mongodb').ObjectId
const changeProductQuantity = (req, res) => {
    console.log(req.body)
    Carts.findOne({ userID: req.user.id }).then(Card => {
        let product = Card.products.find(product => product.productID == req.body.productID)
        console.log(product)
        if (product.quantity == 1 && req.body.quantity == -1) {
            res.status(400).send('you cant remove the product')
        }
        else {
            product.quantity += req.body.quantity
            Card.save()
            res.status(200).json({ status: true, message: 'product quantity changed' })
        }
    }).catch(err => {
        res.json({ status: false, message: 'product not found ' })
    })
}
const removeCartProduct = (req, res) => {
    Carts.findOne({ userID: req.user.id }).then(Cart => {
        var ProductInfo = Cart.products.find(product => product.productID == req.params.id)
        console.log(ProductInfo)
        if (ProductInfo) {
            Cart.products.pull(ProductInfo)
            Cart.save()
            res.json({status:true,message:'Product removed from Cart successfully'})
        } else {
            
            res.json({status:false,message:'Product not found in Cart'})
        }
    }).catch(err => {
        console.log(err,'err find cart')
        res.json({status:false,message:'Oops! something went wrong'})
    })
}
const removeAllCartProducts = (req, res) => {
    Carts.deleteOne({ userID: req.user.id }).then(Cart => {
        res.json({ status: true, message: 'Cart cleared successfully' })
    }).catch(err => {
        res.json({ status: false, message: 'Oops! something went wrong' })
    })
}
module.exports = { changeProductQuantity,removeCartProduct ,removeAllCartProducts}