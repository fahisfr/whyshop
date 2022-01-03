var User = require('../../Schemas/User');
var bcrept = require('bcryptjs');


const CareateUser = async (req, res) => {
    const { name, number, password } = req.body
    User.findOne({ number: number }).then(user => {
        if (user) {
            res.json({ status: false, message: 'User already exists' })
        } else {
            bcrept.hash(password, 12).then(bcreptpassword => {
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