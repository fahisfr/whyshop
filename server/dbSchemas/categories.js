const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,required: true
    },
    imageid: {
        type: String,required: true}
}, { collection: 'categoryes' });

const Product = mongoose.model('categoryes', ProductSchema,);

module.exports = Product