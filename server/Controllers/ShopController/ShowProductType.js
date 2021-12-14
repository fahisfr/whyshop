
var Product =require("../../Schemas/Products") 

const getProduct = async (req, res) => {
    console.log('getProduct');
    try {
        var Products = await Product.find({ type: req.params.id })
        res.json({ status: true, Products: Products, message: "Product Found" })
        console.log(Products);
    } catch (err) {
        console.log(err);
        res.json({status:false,message:"Product Type Note Found"})
        }

    
}
module.exports = getProduct