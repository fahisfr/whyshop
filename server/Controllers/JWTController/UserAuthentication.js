var jwt =require('jsonwebtoken');


const AutthenticationController = (req, res) => {
    const auteheader = req.headers['authorization']
    console.log(auteheader)
    if (!auteheader) return res.status(200).json({ status: false, message: 'Token not found' })
    jwt.verify(auteheader, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
        if (decoded) {
            return res.status(200).json({ status: true, name:decoded.name,nubmer:decoded.number, message:"Authorization Successful" })
        } else {
            res.status(200).json({ status: false, message: 'Invalid token' })
        }
   
    })
   
}




module.exports = AutthenticationController;