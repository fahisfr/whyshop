const roles =require('../Config/Role')
const Roles=(...roles) => {
    return (req, res, next) => {
        console.log(...roles)
        if (!roles.includes(req.user.role)) {
            return res.status(404).json({
            status: false,
            message: "You don't have permission to perform this action"
        });}
        next();
    };
}
module.exports = Roles;