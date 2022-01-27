const Product = require("../../Schemas/Product")

const findProduct = async (req, res) => {
    Product.find({}).then(result => {
        res.json({status:true,message:"Products found",products:result})
    }).catch(err=>res.json({status:false,message:"Products not found"}))


}
module.exports = findProduct