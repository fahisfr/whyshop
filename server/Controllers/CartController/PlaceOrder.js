
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
    console.log('requiest send')
    if (req.body.paymentType === 'COD') {

        Cart.findOne({ UserID: req.user.id }).then(async (cart) => {
            console.log(cart)
            if (cart) {
                let totalPrice = await GetCartInfo.CartProductTolal(req.user.id);
                Order.create({
                    userID: cart.userID,
                    paymentType: "COD",
                    products: cart.products,
                    total: totalPrice,
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
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err.message);
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
        console.log('data')
        Cart.findOne({ UserID: req.user.id }).then(async cart => {
            if (cart) {
                var totalPrice = await GetCartInfo.CartProductTolal(req.user.id);
                Order.create({
                    userID: cart.userID,
                    paymentType: "Online",
                    paymentStatus: "Pending",
                    products: cart.products,
                    total: totalPrice,
                    address: {
                        name: req.body.name, number: req.body.number, lademark: req.body.lademark,
                        city: req.body.city,
                    },
                    paymentID: null,
                }).then(order => {
                    instance.orders.create({
                        amount: totalPrice * 100,
                        currency: "INR",
                        receipt: '' + order._id,
                    }, (err, bill) => {
                        console.log(bill);
                        order.paymentID = bill.id
                        order.save()
                        res.json({ status: true, message: "Order Placed Successfully", order: bill })
                    })
                })
            }
        })

    } else {
        res.json({ status: false, message: "Cart is empty" })
    } 
        
}


module.exports = PlaceOrder