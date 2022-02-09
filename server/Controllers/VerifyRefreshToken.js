const jwt = require('jsonwebtoken');
const Userdb = require('../DBSchemas/User');
const ApiErrors = require('./../Config/ApiErrors')

const RefreshTokenController = (req, res, next) => {
    try {
        const cookie = req.cookies
        if (!cookie?.refreshtoken) { return res.status(401).json({ auth: false, message: 'No token provided.' }) }
        jwt.verify(cookie.refreshtoken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (decoded) {
                const FindUser = await Userdb.findOne({ _id: decoded.id, refreshToken: cookie.refreshtoken })
                if (!FindUser) return res.status(400).json({ auth: false, message: 'token not valid.' });
                const accessToken = jwt.sign({ name: FindUser.name, number: FindUser.number, id: FindUser._id, role: FindUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
                res.json({
                    success: true,
                    message:"new accesstoken", accesstoken: accessToken, UserInfo: {
                        name: FindUser.name,
                        number: FindUser.number,
                        role: FindUser.role,
                    },
                })
            } else {
                console.log(err)
                res.status(403).json({ auth: false, message: '' });
            }
        });
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
}
module.exports = RefreshTokenController