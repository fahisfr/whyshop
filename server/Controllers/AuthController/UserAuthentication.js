const jwt = require('jsonwebtoken');
const Role_List = require('../../Config/Roles')

const AuthenticationController = (req, res,next) => {
    try {
        const auteheader = req.headers['authorization']
        if (!auteheader) return res.json({ status: false, message: 'Token not found' })
        jwt.verify(auteheader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (decoded) {
                return res.status(200).json({
                    UserInfo: {
                        name: decoded.name,
                        number: decoded.number,
                        role: decoded.role,
                        isAthu: true,
                    },
                })
            } else {
                res.status(401).json({ message:err.message})
            }
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = AuthenticationController;