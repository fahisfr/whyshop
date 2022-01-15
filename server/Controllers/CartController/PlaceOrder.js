
const Razorpay = require('razorpay')
var Cart = require('../../Schemas/Cart')
var Order = require('../../Schemas/Order')
var GetCartInfo = require('./GetCartInfo')
var objectid = require('mongodb').ObjectId
var instance = new Razorpay({
    key_id: 'rzp_test_lFLdi5y9B4LWvU',
    key_secret: 'vbG8Jl9hj7gEGbX1n3n8ir4n',
});

const PlaceOrder = async (req, res) => {
    const UserID=req.user.id
    if (req.body.paymentType === 'COD') {
        Cart.findOne({ UserID: req.user.id }).then(async (cart) => {
            if (cart) {
               const ProductInfo= await Promise.all([GetCartInfo.getCartProduct(UserID),GetCartInfo.CartProductTolal(UserID)])
                Order.create({
                    userID: cart.userID,
                    paymentType: "COD",
                    products: ProductInfo[0],
                    totalPrice: ProductInfo[1],
                    address: {
                        name: req.body.name, number: req.body.number, lademark: req.body.lademark,
                        city: req.body.city,
                    },
                }).then(order => {
                    console.log(order)
                    Cart.deleteOne({ _id: cart._id }).then(() => {
                        res.json({ status: true, message: "Order Placed Successfully", })
                    }).catch(err => {
                        res.json({ status: false, message: "Order Placed Failed", })
                    })
                }).catch(err => {
                    res.json({ status: false, message: "Oops! something went wrong please try again" })
                })
            } else {
                res.json({ status: false, message: "Cart is empty" })
            }
        }).catch(err => {
            console.log(err);
            res.json({ status: false, message: 'Oops! something went wrong please try again' })
        })
    } else if (req.body.paymentType === "Online") {
        const UserCart = await Cart.findOne({ UserID: req.user.id }).exec()
        if (UserCart) {
            const ProductInfo = await Promise.all([GetCartInfo.getCartProduct(UserID),GetCartInfo.CartProductTolal(UserID)])
            Order.create({
                userID: UserCart.userID,
                paymentType: "Online",
                products: ProductInfo[0],
                totalPrice: ProductInfo[1],
                address: {
                    name: req.body.name, number: req.body.number, lademark: req.body.lademark,
                    city: req.body.city,
                },
                paymentID: null,
            }).then(order => {
                console.log(order)
                instance.orders.create({
                    amount: ProductInfo[1] * 100,
                    currency: 'INR',
                    receipt: order._id,
                    payment_capture: 1
                }).then(async (response) => {
                    order.paymentID = response.id;
                    await order.save();
                    res.json({ status: "razorpay", message: "Order Placed Successfully", order: response })
                }).catch(err => {
                    res.json({ status: false, message: "Oops! something went wrong please try again" })
                })
            }).catch(err => {
                console.log(err.message);
            })
        }
    } else {
        res.status(400).json({ status: false, message: "Cart is empty" })} 
        
}


module.exports = PlaceOrder