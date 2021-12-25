var jwt =require('jsonwebtoken');


const AuthenticationController = (req, res) => {
    const auteheader = req.headers['authorization']
    if (!auteheader) return res.status(200).json({ status: false, message: 'Token not found' })
    jwt.verify(auteheader, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
        if (decoded) {
            console.log('User athu success')
            return res.status(200).json({ status: true, name: decoded.name, nubmer: decoded.number, isAuth:true})
        } else { 
            console.log('User athu faild')
            res.status(200).json({ status: false, message: 'Invalid token' })
        }
   
    })
   
}




module.exports = AuthenticationController;