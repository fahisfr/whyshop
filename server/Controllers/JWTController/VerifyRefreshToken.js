const User = require('../../Schemas/User');
var jwt = require('jsonwebtoken');
const { find } = require('../../Schemas/User');


const RefreshTokenController = (req, res) => {
    console.log(req.cookies.refreshtoken);
    const Token = req.cookies
    if (!Token?.refreshtoken) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    console.log('passed');
    jwt.verify(Token.refreshtoken, `${process.env.REFRESH_TOKEN_SECRET}`, (err, decoded) => {
        console.log('start');
        if (decoded) {
            console.log('passed');
            User.findOne({ _Id: decoded._id, refreshToken: Token.refreshToken }).then(user => {
                if (!user) {
                    return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    const accessToken = jwt.sign({ _id: user._Id }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1h' });
                    res.cookie('accesstoken', accessToken, { httpOnly: true, secure: true });
                    return res.status(200).json({ auth: true,accesstoken:accessToken ,message:  'Token is valid.' });
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