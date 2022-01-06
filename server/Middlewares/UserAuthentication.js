const User = require('../Schemas/User')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const auteheader = req.headers['authorization']
    if (!auteheader) return res.status(200).json({ status: false, message: 'Token not found' })
    jwt.verify(auteheader, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
        if (err) return res.status(200).json({ status: false, message: 'Invalid Token' })
        req.user = decoded
        console.log(req.user.id)
        next()
    })
}