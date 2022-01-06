
var Product =require("../../Schemas/Product") 

const getProduct = async (req, res) => {
    const { id } = req.params
    const FindProducts = await Product.find({ type: id }).exec()
    
    if (FindProducts) {
        res.json({ status: true, message: "product found", Products: FindProducts })
    } else {
        res.json({ status: false, message: "product not found" })
    }

    
}

module.exports = getProduct