const Products = require("../../Schemas/Product");
var Cart = require("../../Schemas/Cart");


const PrdoductAddToCart = async (req, res) => {
    console.log("PrdoductAddToCart");
    var Product = await Products.findOne({ _id: req.params.id })
    if (!Product) {
        return res.status(404).send({ message: "Product Not type Found" })
    }
    console.log(Product)
    var cart = await Cart.findOne({ userID: req.user.id });
   
    if (cart) {
        var check = cart.products.find(x => x.productID == req.params.id);
        
        if (check) {
            console.log('product already in cart');
            cart.products.find(x => x.productID == req.params.id).quantity += 1
            cart.save()
            res.json({ status: true, data: cart, message: 'Product Quantity Updated' })
        } else {
            cart.products.push({ productID: Product._id, quantity: 1 })
            cart.save()
            res.json({ status: true, data: cart, message: 'Product Added To Cart' })
            
        }
    } else {
        Cart.create({ userID: req.user.id, products: { productID: Product._id } }, (err, newcart) => {
            if (err) {
                res.status(500).json({ status: false, message: 'Filed Add To Cart' });
            } else {
                res.json({ status: true, data: newcart, message: ' Product Added' })
            }
        })
    } 
}




module.exports = PrdoductAddToCart