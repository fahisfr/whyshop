const dbFeedback = require('../DBSchemas/Feedback')
const ApiErrors=require('../Config/ApiErrors')


const getAllFeedback = (req, res, next) => {
    try {
        const allFeedback = dbFeedback.find({})
        if (!allFeedback) return next(ApiErrors.InternalServerError(allFeedback))
        res.json({success:true,message:'All feedback',feedback:allFeedback})
    } catch (error) {
        next(ApiErrors.InternalServerError(error.message))
    }
    
}
module.exports=getAllFeedback