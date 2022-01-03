var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    product_type: {
        enum:[],
        type: String, required: true
    },
    quantity: { type: Number, required: Number, min: 0, default: 0 },
    availiabel: { type: Boolean, default: true },
    image: { type: String, required: true },
}, { collection: 'products' })

const Product = db.model('Product', AddProduct)


module.exports = Product