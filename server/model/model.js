var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true ,},
    price: { type: Number, required: true, unique: true},
    product_type: { type: String, required: true },
    quantity: { type: Number, required: Number },
},{collection:'products'})

const addproduct = db.model('Product', AddProduct)


module.exports = addproduct
