const Carts     = require('../../Schemas/Cart')
const Products  =require('../../Schemas/Product')

const changeProductQuantity = async (req, res) => {
    const FindCart = await Carts.findOne({ userID: req.user.id }).exec()
    if (FindCart) {
        try {
            const Product = await FindCart.products.find(product => product.productID == req.params.id)
            const ProductInfo = await Products.findOne({ _id: req.params.id }).exec()
            if (ProductInfo.quantity === Product.quantity && req.body.quantity === .5) return res.json({ status: false, message: "Product out of stock" })
            if (Product.quantity <= .5 && req.body.quantity == -.5) {return res.json({ status: false, message: "Product minimum quantity is .5" })
            } else {
                Product.quantity += req.body.quantity
                FindCart.save()
                res.json({ status: true, message: 'Product quantity updated successfully' })
            }
        } catch (err) { res.json({ status: false, message: 'Oops! something went wrong' }) }
    } else { res.json({ status: false, message: 'Cart not found' }) }
}
const removeCartProduct = (req, res) => {
    Carts.findOne({ userID: req.user.id }).then(Cart => {
        const ProductInfo = Cart.products.find(product => product.productID == req.params.id)
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