const dbUser=require('../DBSchemas/User')

const getAllUser = (res, req, next) => {
    try {
        const allUser = dbUser.find({},{password:0,})
        if (!allUser) return next(ApiErrors.InternalServerError(allUser))
        res.json({ success: true, message: 'All User', user: allUser })
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
}
module.exports = getAllUser