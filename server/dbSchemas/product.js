var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {type: String, required: true},
    quantity: { type: Number, required: Number, min: 1, },
    imageId: { type: String, },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, { collection: 'products' })

const Product = db.model('products', AddProduct)


module.exports = Product