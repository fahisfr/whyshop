var db = require('mongoose')


const AddProduct = new db.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
        enum:[],
        type: String, required: true
    },
    quantity: { type: Number, required: Number, min: 0, default: 0 },
    availiabel: { type: Boolean, default: true },
    imageId: { type: String, },
    //set createdAt and updatedAt in india time
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default:  Date.now }
}, { collection: 'products' })

const Product = db.model('Product', AddProduct)


module.exports = Product