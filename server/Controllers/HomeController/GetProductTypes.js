const ProductType = require('../../Schemas/ProductType')
const Product = require('../../Schemas/Product')
module.exports = (req, res) => {
    Promise.all([ProductType.find({}), Product.find({})]).then(([types, products]) => {
        res.json({types,products})
    })
}