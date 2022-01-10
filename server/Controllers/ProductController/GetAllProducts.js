const Product = require("../../Schemas/Product")


const findProduct = async (req, res) => {
    Product.find({}).then(data => {
        res.json({status:true,message:"Products found",products:data})
    }).catch(err=>res.json({status:false,message:"Products not found"}))

}
module.exports = findProduct