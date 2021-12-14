var User = require('../../Schemas/User');
var jwt = require('jsonwebtoken');
var cookie = require('cookie-parser');
var bcrept=require('bcryptjs');


const CareateUser = async (req, res) => {
    console.log(req.body);
    var { name, number, password } = req.body
    name = name.trim()
    console.log(name);
    number = number.trim()
    password = password.trim()
    if (!name || !number || !password) {
       return res.json({
            status: false, message: 'Please fill all the fields'
        })
    }
    else if (!/^[a-zA-Z]*$/.test(name)) {
        return res.json({ 
            status: false, message: 'Name should be alphabets only'
        })
    } else if (!/^[0-9]*$/.test(number)) {
        return res.json({
            status: false, message: 'Number should be numbers only'
        })
    } else if (password.length < 6 || password.length > 22) {
        return res.json({
            status: false, message: 'Password should be 6-22 characters long'
        })
    } else if (name.length < 3 || name.length > 12) {
        return res.json({
            status: false, message: 'Name should be 3-12 characters long'
        })
    } else if (number.length < 10 || number.length > 10) {
        res.json({
            status: false, message: 'Number should be 10 digits long'
        })
    } else {
        User.findOne({ number: number }).then(user => {
            if (user) {
                resjson({
                    status: false, message: 'Number  already exists'
                })

            } else {
                bcrept.hash(password, 12).then(bcreptpassword => {
                    console.log(bcreptpassword);
                    const newUser = User.create(
                        { name: name, number: number, password: bcreptpassword }).then(user => {
            
                            res.json({
                                status: true, message: 'Account created successfully'
                            })
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                status: false, message: 'Oops! something went wrong please try again'
                            })
                        })
                    
                }).catch(error => {
                    console.log(error)
                    res.status(500).json({status:false,message:"Oops! something went wrong please try again"})
                })
                
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                status: false, message: "Oops! something went wrong please try again"
            })
        })
    }
        
}

module.exports = CareateUser;