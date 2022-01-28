
var Product =require("../../Schemas/Product") 

const GetCategory = async (req, res) => {
    try {
        const { id } = req.params
        const FindProducts = await Product.find({ type: id }).exec()
        if (!FindProducts) return res.json({ status: false, message: 'Product type  not ' })
        res.json({ status: true, message: "product found", product: FindProducts })
    } catch (err) {
        next(err)
    }
}

module.exports = GetCategory