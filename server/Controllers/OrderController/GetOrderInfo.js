const Order = require('../../Schemas/Order')
const objectid = require('mongodb').ObjectId


const GetOrderInfo = async (req, res) => {
    const UserID = req.user.id
    Order.find({ userID: UserID }, { paymentID: 0, userID: 0, _id: 0 }).then(order => {
        console.log(order)
        res.json({ status: true, message: "Order List", order: order})
    }).catch(err => {
        res.status(400).json({ message: "no order found" })
    })
    
}
module.exports = GetOrderInfo