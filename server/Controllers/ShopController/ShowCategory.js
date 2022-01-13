
var Product =require("../../Schemas/Product") 

const GetCategory = async (req, res) => {
    const { id } = req.params
    const FindProducts = await Product.find({ type: id }).exec()
    if (FindProducts) {
        res.json({ status: true, message: "product found", product: FindProducts })
    } else {
        console.log(FindProducts)
        res.status(404).json({message:'Product not found'})
    }
}

module.exports = GetCategory