var mongoose = require('mongoose');



const OrderSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId,  required: true },
    OrderAt: { type: Date, default: Date.now },
    paymentType: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    products: [{productID: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: true},
        quantity: {
            type: Number,
            required: true,
            _id:false
        }
    }],
    address: [{
        name: { type: String, required: true },
        number: { type: String, required: true },
        place: { type: String, required: true },
        lademark: { type: String, required: true },}],
    total: {type: Number,required: true},
    paymentID: {type: String,default: null},
   
});

const Order = mongoose.model('Order', OrderSchema);

module.exports=Order;

