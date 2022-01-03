
const jwt = require('jsonwebtoken');
var path = require('path');
const bcrypt = require('bcryptjs');
const Role_List= require('../../Config/Role')
const User = require('../../Schemas/User');



const handleLogin = (req, res) => {
    const { number, password } = req.body
    User.findOne({ number: number }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    let accesstoken = jwt.sign({ name:user.name,number:user.number,id:user._id,role:user.role }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '2h' });
                    let refreshtoken = jwt.sign({ id: user._id, role: user.role }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1d' });
                    user.refreshToken = refreshtoken;
                    user.save();
                    res.cookie('refreshtoken', refreshtoken, { maxAge: 86400000, httpOnly: true });
                    res.json({
                        status: true,
                        message: 'Login Successful ', accesstoken: accesstoken, UserInfo: {
                            name: user.name,
                            number: user.number,
                            role:user.role,
                        },
                   
                    })
                    console.log(user.role)
                } else {
                    res.json({
                        status: false,
                        message: 'Invalid Password',
                    })
                }
            }).catch(err => {
                resjson({
                    status: false,
                    message: 'Opps! Something went wrong please try again',
                })
            })
        } else {
            res.json({
                status: false,
                message: 'Invalid Number',

            })
        }
    }).catch(err => {
        res.json({
            status: false,
            message: 'Oops! Something went wrong please try again',
        })
    })
}

module.exports = handleLogin;