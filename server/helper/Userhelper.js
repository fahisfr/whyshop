const { log } = require('debug');
var jwt = require('jsonwebtoken');
const { resolve, reject } = require('promise');
const addproduct = require('../model/model');
var User = require('../model/User');


module.exports = {
    authention: (accesstoken, refreshtoken) => {
        return new Promise(async (resolve, reject) => {
            jwt.verify(accesstoken, 'accesstoken', (err, decode) => {
                if (!err) {
                    resolve({ status: true, data: decode })
                } else {
                    if (err.message == 'jwt expired') {
                        jwt.verify(refreshtoken, 'refrestoken', (err, decode) => {
                            if (!err) {
                                User.findOne({ _id: decode.id, refreshtoken: refreshtoken }, (err, user) => {
                                    if (!err) {
                                        var accesstoken = jwt.sign({ id: user._id }, 'accesstoken', { expiresIn: '30s' });
                                        var refreshtoken = jwt.sign({ id: user._id }, 'refreshtoken', { expiresIn: '10m' });
                                        console.log('create x token and y token for user new token');
                                        resolve({ status: false, accesstoken: accesstoken, refreshtoken: refreshtoken, message: 'new refreshtoken' });
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
                    var accesstoken = jwt.sign({ id: user._id }, 'accesstoken', { expiresIn: '30s' });
                    var refreshtoken = jwt.sign({ id: user._id }, 'refreshtoken', { expiresIn: '10m' });
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
                        var accesstoken = jwt.sign({ id: user._id }, 'accesstoken', { expiresIn: '30s' });
                        var refreshtoken = jwt.sign({ id: user._id }, 'refreshtoken', { expiresIn: '10m' });
                        user.refreshtoken = refreshtoken;
                        user.save();
                        resolve({ status: true, accesstoken: accesstoken, refreshtoken: refreshtoken, message: 'Successfully Login' });
                    } else {
                        reject({ status: false, message: 'User Not Found' });
                    }
                } else {
                    reject({ status: false, message: err.message });
                }
            })
        })
    }
}