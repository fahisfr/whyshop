const { number } = require('joi');
var jwt = require('jsonwebtoken');
const Role_List = require('../../Config/Role')


const AuthenticationController = (req, res) => {
    let auteheader = req.headers['authorization']
    if (!auteheader) return res.status(200).json({ status: false, message: 'Token not found' })
    jwt.verify(auteheader, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
        if (decoded) {
            return res.status(200).json({ UserInfo: {
                    name: decoded.name,
                    number: decoded.number,
                    role: decoded.role,
                    isAthu: true,
                },})
        } else { 
            console.log('User athu faild')
            res.status(200).json({ UserInfo:{
                name: '',
                number: '',
                role: '',
                isAthu:false
            } })
        }
   
    })
   
}




module.exports = AuthenticationController;