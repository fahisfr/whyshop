const jwt = require('jsonwebtoken');
const ApiErrors = require('./../Config/ApiErrors')
const AuthenticationController = (req, res,next) => {
    try {
        const auteheader = req.headers['authorization']
        if (!auteheader) return ApiErrors.Unauthorized('No token provided.')
        jwt.verify(auteheader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (decoded) {
                return res.status(200).json({
                    UserInfo: {
                        name: decoded.name,
                        number: decoded.number,
                        role: decoded.role,
                        isAuth: true,
                    },
                })
            } else {
                next(ApiErrors.Unauthorized('Token not valid'))
            }
        })
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
    
}

module.exports = AuthenticationController;