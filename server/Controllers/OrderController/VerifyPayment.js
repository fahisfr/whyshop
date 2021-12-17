var crypto = require('crypto')
var order = require('../../Schemas/Order')
var Cart = require('../../Schemas/Cart')
var objectid = require('mongodb').ObjectId
const verifyPayment =async ( req, res) => {
    req.body = req.body.order
    console.log(req.body)
        var secret = 'vbG8Jl9hj7gEGbX1n3n8ir4n';
        var hash = crypto.createHmac('sha256', secret).update(req.body.razorpay_order_id+ "|" + req.body.razorpay_payment_id ).digest('hex');
    if (req.body.razorpay_signature == hash) {
        res.json({ status: true, message: "Payment Successful" })
        console.log(req.body.razorpay_order_id)
        order.findOne({ paymentID: req.body.razorpay_order_id }).then(order => {
            console.log(order)
                order.paymentStatus = "Success"
                order.save()
        })
        Cart.deleteOne({ UserID: req.user.id })
    } else {
        res.json({ status: false, message: "Payment Failed" })
    }
}


module.exports = verifyPayment