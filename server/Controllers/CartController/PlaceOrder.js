const Razorpay = require('razorpay')
const Cart = require('../../Schemas/Cart')
const Order = require('../../Schemas/Order')
const GetCartInfo = require('./GetCartInfo')
var objectid = require('mongodb').ObjectId
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET ,
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
                    Cart.deleteOne({ UserID: req.user.id }, (err, result) => {
                        if (!err) {
                            res.json({ status: true, message: "Order Placed Successfully" })
                        }
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
                    res.json({razorpay:true, message: "Order Placed Successfully", order: response })
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