const User = require('../DBSchemas/User')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const auteheader = req.headers['authorization']
    if (!auteheader) return res.status(401).json({ status: false, message: 'Token not found' })
    jwt.verify(auteheader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ status: false, message: 'Token not valid' })
        req.user = decoded
        next()
    })
}