// import model product in object
var { addproduct }= require('../model/model');
const db = require('mongoose');

module.exports = {
    AddProduct: (data) => {
        const product = {
            name: data.name,
            price: data.amount,
            product_type: data.type,
            quantity: data.quantity,
        };
        console.log(product);
        return new Promise(async(resolve, reject) => {
            addproduct.create(product,(err, result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        })
    },
    
}
