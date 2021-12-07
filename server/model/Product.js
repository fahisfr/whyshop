var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    product_type: { type: String, required: true },
    quantity: { type: Number, required: Number ,min: 0 ,default: 0},
    availiabel: { type: Boolean,default: true },
    description: { type: String, },
    image: { type: String, },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

},{collection:'products'})

const addproduct = db.model('Product', AddProduct)


module.exports = addproduct
