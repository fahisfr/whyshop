const DB_User=require('../DBSchemas/User')
const Roles = (...Allowed_Roles) => {
    return async (req, res, next) => {
        try { const FindRole =Allowed_Roles.includes(req.user.role)
        if (FindRole) {
        const VerifyRole = await DB_User.findOne({ _id: req.user.id,role:req.user.role}).exec()
        if (VerifyRole) {console.log(`${req.user.name} Access To Admin Route`), next()
        }else {res.status(404).json({ status: false, message: "better luck next time" })}
        } else { res.status(404).json({ status: false, message: "You don't have permission to perform this action" }) }
        } catch (err) { next(err) }
    };
}
module.exports = Roles;