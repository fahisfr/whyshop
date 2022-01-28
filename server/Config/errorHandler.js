

const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ status: false, message: 'Oops! something went wrong' })
    
}
module.exports = errorHandler;