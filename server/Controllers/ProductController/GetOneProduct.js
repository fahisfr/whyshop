const Product = require('../../Schemas/Product')



const GetProdcut = (req, res) => {
    Product.findOne({ name: req.params.id }).then(result => {
        if (result) {
            res.json({ status: true, message: "product found", product: result })
        } else {
            res.status(404).json({ message: 'product not found' })
        }
    }).catch(err=> res.status(404).json({message:'Product not found'}))
    
}

module.exports=GetProdcut