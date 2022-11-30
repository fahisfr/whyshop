const dbFeedback = require('../DBSchemas/Feedback')

const getAllFeedback = (req, res, next) => {
    try {
        const allFeedback = dbFeedback.find({})
        if (!allFeedback) return next(ApiErrors.InternalServerError(allFeedback))
        res.json({success:true,message:'All feedback',feedback:allFeedback})
    } catch (error) {
        next(error)
    }
    
}
module.exports=getAllFeedback