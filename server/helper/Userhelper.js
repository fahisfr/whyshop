const { log } = require('debug');
var jwt = require('jsonwebtoken');
const { resolve, reject } = require('promise');
var User = require('../model/User');
var Cart = require('../model/Cart');
var Products = require('../model/model');
const objectid = require('mongodb').ObjectId


module.exports = {
    authention: (accesstoken, refreshtoken) => {
        return new Promise(async (resolve, reject) => {
            jwt.verify(accesstoken, '1', (err, decode) => {
                if (!err) {
                    resolve({ status: true, data: decode })
                } else {
                    if (err.message == 'jwt expired') {
                        jwt.verify(refreshtoken, '1', (err, decode) => {
                            if (!err) {
                                User.findOne({ _id: decode.id, refreshtoken: refreshtoken }, (err, user) => {
                                    if (!err) {
                                        var accesstoken = jwt.sign({ id: user._id, name: user.name, number: user.number }, '1', { expiresIn: '1d' });
                                        var refreshtoken = jwt.sign({ id: user._id }, '1', { expiresIn: '2d' });
                                        console.log('create x token and y token for user new token');
                                        resolve({ status: false, accesstoken: accesstoken, refreshtoken: refreshtoken, message: 'new refreshtoken'});
                                    } else {
                                        reject({
                                            status: 404,
                                            message: 'User Refreshtoken No Find'
                                        });
                                    }
                                })
                            } else {
                                reject({
                                    status: false,
                                    message: 'RefreshEoken Expired'
                                });
                            }
                        });
                    } else {
                        console.log(err.message);
                        reject({
                            status: false,
                            message: 'AccessToken  Invalid'
                        })
                    }
                }
            })
        })
    },
    Signup: (userData) => {
        return new Promise((resolve, reject) => {
            User.create({ name: userData.name, number: userData.number, password: userData.password }, (err, user) => {
                if (!err) {
                    var accesstoken = jwt.sign({ id: user._id,name:user.name,number:user.number }, '1', { expiresIn: '1d' });
                    var refreshtoken = jwt.sign({ id: user._id }, '1', { expiresIn: '2d' });
                    user.refreshtoken = refreshtoken;
                    user.save();
                    resolve({ status: true, accesstoken: accesstoken, refreshtoken: refreshtoken, message: 'Successfully Created A New account' });
                } else {
                    reject({ status: false, message: err.message });
                }
            })
        })
            
        
    },
    Login: (data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ number: data.number, password: data.password }, (err, user) => {
                if (!err) {
                    if (user) {
                        var accesstoken = jwt.sign({ id: user._id, name: user.name, number: user.number  }, '1', { expiresIn: '1d' });
                        var refreshtoken = jwt.sign({ id: user._id }, '1', { expiresIn: '1d' });
                        user.refreshtoken = refreshtoken;
                        user.save();
                        resolve({ status: true, data:user, accesstoken: accesstoken, refreshtoken: refreshtoken, message: 'Successfully Login' });
                    } else {
                        reject({ status: false, message: 'User Not Found' });
                    }
                } else {
                    reject({ status: false, message: err.message });
                }
            })
        })
    },
    getProduct: (data) => {
        return new Promise((resolve, reject) => {
            Products.find({type:data}, (err, product) => {
                if (!err) {
                    resolve({ status: true, data: product });
                } else {
                    reject({ status: false, message: err.message });
                }
            })
        })
    },
    addToCart: (product, user) => {
        return new Promise(async (resolve, reject) => {
            var cart = await Cart.findOne({ user: user });
            if (cart) {
              
                var check = cart.products.find(x => x.productID == product);
                if (check) {
                    console.log('product already in cart');
                    
                    cart.products.find(x => x.productID == product).quantity += 1
                    cart.save()
                    resolve({ status: true, data: cart,message:'Product Quantity Updated'})
                } else {
                    cart.products.push({ productID:product, quantity: 1 })
                    cart.save()
                    resolve({ status: true, data: cart,message:'Product Added To Cart'})
                }
            } else {
                Cart.create({ userID: user, products: { productID:product}},(err,newcart)=>{
                    if (err) {
                        reject({ status: false, message: err.message });
                    } else {
                        resolve({ status: true, data: newcart,message:'New Cart Created And Product Added'})
                    }
                })
            }
        })
    },
    getCart:  (user) => {
        return new Promise((resolve, reject) => {
            Cart.aggregate([
                {
                    $match: { userID: objectid(user) }
                },
                {
                    $unwind: "$products"
                },
                {
                    $project: {
                        productsId: "$products.productID",
                        quantity: "$products.quantity"
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: "productsId",
                        foreignField: "_id",
                        as: "products"
                    }
                
                },
               

            ]).then(cart => {
                console.log(cart)
                
                if (cart.length == 0) {
                    reject({ status: false, message: 'Cart Is Empty' })
                } else {
                    resolve({ status: true, data: cart })
                }
            }).catch(err => {
                reject({ status: false, message: 'Somthing IS worng' })
             })


        })
        
    }
}