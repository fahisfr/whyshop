const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,required: true
    },
    imageid: {
        type: String,required: true}
}, { collection: 'types' });

const Product = mongoose.model('type', ProductSchema,);

module.exports = Product