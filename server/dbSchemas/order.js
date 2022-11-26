var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,  required: true },
    OrderAt: { type: Date, default: Date.now,required: true },
    paymentType: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    products: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        imageId: { type: String, required: true },
        total: { type: Number, required: true },
        _id:false
    }],
    address: {
        name: { type: String, required: true  ,min:10,max:12},
        number: { type: String, required: true },
        city: { type: String, required: true },
        lademark: { type: String,  },
        _id:false
        
    },
    totalPrice: {type: Number,},
    paymentID: { type: String, default: null },
    OrderStatus: {
        type: String,
        // cum: ['Picking','Packing','Packed', 'Out for delivery', 'Delivered', 'Canceled'],
        default: "Picking"
    },
   
});

const Order = mongoose.model('Order', OrderSchema);

module.exports=Order;

