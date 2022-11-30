const dbUser=require('../DBSchemas/User')

const getAllUser = (res, req, next) => {
    try {
        const allUser = dbUser.find({},{password:0,})
        if (!allUser) return next(new Error(""))
        res.json({ success: true, message: 'All User', user: allUser })
    } catch (error) {
        next(error)
    }
}
module.exports = getAllUser