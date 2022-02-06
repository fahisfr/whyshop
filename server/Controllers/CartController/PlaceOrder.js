const Razorpay = require('razorpay')
const dbCart = require('../../Schemas/Cart')
const dbOrder = require('../../Schemas/Order')
const GetCartInfo = require('./GetCartInfo')
const ApiErrors = require('../../Config/ApiErrors')
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET ,
});

const PlaceOrder = async (req, res,next) => {
    try {
                                                        //COD stands for Cash on Delivery
        const UserID=req.user.id;
        if (req.body.paymentType === 'COD') {
            const userCart = await dbCart.findOne({ userID: req.user.id }).exec()
            if (!userCart) return res.json({ status: false, message: 'Cart is empty' })
            const ProductInfo = await Promise.all([GetCartInfo.getCartProduct(UserID), GetCartInfo.CartProductTolal(UserID)])
            const userOrder = await dbOrder.create({
                userID: userCart.userID,
                paymentType: "COD",
                products: ProductInfo[0],
                totalPrice: ProductInfo[1],
                address: {
                    name: req.body.name, number: req.body.number, lademark: req.body.lademark,
                    city: req.body.city,
                }
            })
            res.json({ status: true, message: 'Order placed successfully' })
            dbCart.deleteOne({ userID: req.user.id }).then(result => {
                console.log(result)
            })

                                                          // Razorpay setup (online payment)

        } else if (req.body.paymentType === "Online") {

            const userCart = await dbCart.findOne({ userID: req.user.id })
            if (!userCart) return res.json({ status: false, message: 'Cart is empty' })
            const ProductInfo = await Promise.all([GetCartInfo.getCartProduct(UserID), GetCartInfo.CartProductTolal(UserID)])
            const userOrder = await dbOrder.create({
                userID: userCart.userID,
                paymentType: "Online",
                products: ProductInfo[0],
                totalPrice: ProductInfo[1],
                address: {
                    name: req.body.name, number: req.body.number, lademark: req.body.lademark,
                    city: req.body.city,
                },
                paymentID: null,
                
            })
            instance.orders.create({
                amount: ProductInfo[1] * 100,
                currency: 'INR',
                receipt: userOrder._id,
                payment_capture: 1
            }).then(orderInfo => {
               userOrder.paymentID =orderInfo.id;
               userOrder.save();
                res.json({ razorpay: true, message: "Order Placed Successfully", order:orderInfo})
            }).catch(err =>res.status(500).json({ status: false, message: "create order filed try again" }))

        }
    } catch (error) { next(ApiErrors.InternalServerError(error.message))}}


module.exports = PlaceOrder