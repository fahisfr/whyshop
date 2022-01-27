const jwt    = require('jsonwebtoken');
const User   = require('../../Schemas/User');
const bcrept = require('bcryptjs');

require("dotenv").config();

const CareateUser = async (req, res) => {
    const { name, number, password } = req.body
    User.findOne({ number: number }).then(user => {
        if (user) {
            res.json({ status: false, message: 'User already exists' })
        } else {
            bcrept.hash(password, 12).then(bcreptpassword => {
                const newUser = User.create(
                    { name: name, number: number, password: bcreptpassword }).then(user => {
                        let accesstoken = jwt.sign({ name: user.name, number: user.number, id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });
                        let refreshtoken = jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                        user.refreshToken = refreshtoken;
                        user.save();
                        res.cookie('refreshtoken', refreshtoken, { maxAge: 806400000, httpOnly: true });
                        res.json({
                            status: true,
                            message: 'Login Successful ', accesstoken: accesstoken, UserInfo: {
                                id: user._id, name: user.name, number: user.number, role: user.role,
                            },
                        })
                        console.log('work')
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            status: false, message: 'Oops! something went wrong please try again'
                        })
                    })

            }).catch(error => {
                console.log(error)
                res.status(500).json({ status: false, message: "Oops! something went wrong please try again" })
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: false, message: "Oops! something went wrong please try again"
        })
    })
}



module.exports = CareateUser;