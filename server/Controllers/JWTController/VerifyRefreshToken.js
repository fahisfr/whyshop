require("dotenv").config();
const jwt  = require('jsonwebtoken');
const User = require('../../Schemas/User');


const RefreshTokenController = (req, res) => {
    const Token = req.cookies
    if (!Token?.refreshtoken) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(Token.refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (decoded) {  
            User.findOne({ _Id: decoded._id, refreshToken: Token.refreshToken }).then(user => {
                if (!user) {
                    return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    const accessToken = jwt.sign({ _id: user._Id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
                    res.cookie('accesstoken', accessToken, { httpOnly: true, secure: true });
                    res.json({
                        status: true,
                        message: 'Login Successful ', accesstoken: accesstoken, UserInfo: {
                            name: user.name,
                            number: user.number,
                            role: Role_List.user.role,
                        },
                    })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({ auth: false, message: 'Server Error.' });
            });
        } else {
            console.log(err)
            res.status(403).json({ auth: false, message: 'Failed to authenticate token.' });
        }
    });
}
module.exports=RefreshTokenController