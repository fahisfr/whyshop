const dbCarts = require('../../Schemas/Cart')
const dbProducts = require('../../Schemas/Product')
const ApiErrors = require('../../Config/ApiErrors')

const changeProductQuantity = async (req, res, next) => {
    try {
        const FindCart = await dbCarts.findOne({ userID: req.user.id }).exec()
        if (!FindCart) return res.status(404).json({ status: false, message: 'Cart not found' })
        const Product = await FindCart.products.find(product => product.productID == req.params.id)
        const ProductInfo = await dbProducts.findOne({ _id: req.params.id })
        if (ProductInfo.quantity === Product.quantity && req.body.quantity === .5) return res.json({ status: false, message: "Product out of stock" })
        if (Product.quantity <= .5 && req.body.quantity == -.5) {
            return res.json({ status: false, message: "Product minimum quantity is .5" })
        } else {
            Product.quantity += req.body.quantity
            FindCart.save()
            res.json({ status: true, message: 'Product quantity updated successfully' })
        }
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
}


const removeCartProduct = async (req, res,next) => {
    try {
        const userCart = await dbCarts.findOne({ userID: req.user.id }).exec()
        if (!userCart) return res.status(404).json({ status: false, message: 'Cart not found' })
        const Product = userCart.products.find(product => product.productID == req.params.id)
        if (!Product) return res.status(404).json({ status: false, message: 'Product not found in Cart' })
        userCart.products.pull(Product)
        userCart.save()
        res.json({ status: true, message: 'Product removed from Cart successfully' })
    } catch (error) {
        next(ApiErrors.InternalServerError(err.message))
    }

}


const removeAllCartProducts = (req, res,next) => {
    try {
        dbCarts.deleteOne({ userID: req.user.id }).then(result => {
            res.json({ status: true, message: 'All products removed from Cart successfully' })
        })
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
}
module.exports = { changeProductQuantity, removeCartProduct, removeAllCartProducts }