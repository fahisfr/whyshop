
var jwt = require('jsonwebtoken');
var path = require('path');
var bcrypt = require('bcryptjs');
const User = require('../../Schemas/User');



const handleLogin = (req, res) => {
    const { number, password } = req.body
    User.findOne({ number: number }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    var accesstoken = jwt.sign({ name: user.number, id: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '2h' });
                    var refreshtoken = jwt.sign({ name: user.number, }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1d' });
                    user.refreshToken = refreshtoken;
                    user.save();
                    res.cookie('refreshtoken', refreshtoken, { maxAge: 86400000, httpOnly: true });
                    res.json({
                        status: true,
                        message: 'Login Successful ', accesstoken: accesstoken, name: user.name, number: user.number
                    })
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