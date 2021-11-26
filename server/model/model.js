var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true ,unique:true},
    price: { type: String, required: true },
    product_type: { type: String, required: true },
    quantity: { type: String, required: false },
},{collection:'products'})

const addproduct = db.model('Product', AddProduct)


module.exports = {
    addproduct
    
}
