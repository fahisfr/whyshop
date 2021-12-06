var mongoose = require('mongoose')


var SchemaCart = new mongoose.Schema({
    userID: { type: mongoose.Schema.ObjectId, required: true },
    createAt: { type: Date, immutable:true,default: () => new Date },
    updateAt: { type: Date, default: () => new Date },
    products: [{
        productID: { type: mongoose.Schema.ObjectId},
        quantity: { type: Number, default: 1 },
    }],
})
module.exports=mongoose.model('Cart',SchemaCart)