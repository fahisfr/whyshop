var Product = require("../DBSchemas/Product")
const ApiErrors = require('../Config/ApiErrors')

const GetCategory = async (req, res,next) => {
    try {
        const { id } = req.params
        const FindProducts = await Product.find({ type: id }).exec()
        if (!FindProducts) return res.json({ status: false, message: 'Product type  not ' })
        res.json({ status: true, message: "product found", product: FindProducts })
    } catch (err) {
        next(ApiErrors.InternalServerError(err.message))
    }
}

module.exports = GetCategory