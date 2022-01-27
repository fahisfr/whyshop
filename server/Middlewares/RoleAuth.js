const DB_User=require('../Schemas/User')
const Roles = (...Allowed_Roles) => {
    return async (req, res, next) => {
        const FindRole =Allowed_Roles.includes(req.user.role)
        if (FindRole) {
        const VerifyRole = await DB_User.findOne({ _id: req.user.id,role:req.user.role}).exec()
        if (VerifyRole) {console.log(`${req.user} Access To Admin Route`), next()
        }else {res.status(404).json({ status: false, message: "" })}
        }else {res.status(404).json({ status: false, message: "You don't have permission to perform this action" })}
    };
}
module.exports = Roles;