var mongoose = require('mongoose')


var SchemaCart = new mongoose.Schema({
    userID: { type: String, required: true },
    createAt: { type: Date, immutable:true,default: () => new Date },
    updateAt: { type: Date, default: () => new Date },
    products: {type:Array},
})