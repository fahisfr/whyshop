const jwt = require('jsonwebtoken');
const ApiErrors = require('./../Config/ApiErrors')
const AuthenticationController = (req, res,next) => {
    try {
        console.log(req.headers['authorization'])
        const autheader = req.headers['authorization']
        if (!autheader) return res.json({ isAuth: false, })
        jwt.verify(autheader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
               
                next(ApiErrors.Forbidden('Token not valid'))
            }
        })
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
    
}

module.exports = AuthenticationController;