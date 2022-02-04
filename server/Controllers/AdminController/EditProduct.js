const Product = require('../../Schemas/Product')
module.exports = async (req, res, next) => {
    try {
        const { name, quantity, price } = req.body
        const Edited = await Product.findOneAndUpdate({ name: name },
            { $set: { quantity: quantity, price: price } }
        )
        res.json({ success: true, message: "product updated successfully" })
    } catch (error) {
        next(error)
    }



}