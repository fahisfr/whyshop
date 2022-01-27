const crypto = require('crypto')
const order = require('../../Schemas/Order')
const Cart = require('../../Schemas/Cart')
const objectid = require('mongodb').ObjectId
const verifyPayment =async ( req, res) => {
    req.body = req.body.order
    console.log(req.body)
    let hash = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(req.body.razorpay_order_id+ "|" + req.body.razorpay_payment_id ).digest('hex');
    if (req.body.razorpay_signature == hash) {
        res.json({ status: true, message: "Payment Successful" })
        console.log(req.body.razorpay_order_id)
        order.findOne({ paymentID: req.body.razorpay_order_id }).then(order => {
            console.log(order)
                order.paymentStatus = "Success"
                order.save()
        })
        Cart.deleteOne({ UserID: req.user.id }, (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    } else {
        res.json({ status: false, message: "Payment Failed" })
    }
}


module.exports = verifyPayment