const ProductType = require('../DBSchemas/Categories')
const Product = require('../DBSchemas/Product')
const ApiErrors = require('./../Config/ApiErrors')
module.exports = (req, res, next) => {
    //
    try {
        Promise.all([ProductType.find({}), Product.find({})]).then(([types, products]) => {
            res.json({types,products})
        })
        
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
}