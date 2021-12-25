var ValidationSchema =require('./Schemas')

const SinupAPIValidation = (req, res, next) => {
    const { error } = ValidationSchema.signup.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()
}

const LoginAPIValidation = (req, res, next) => {
    const { error } = ValidationSchema.login.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()
}
    

const PlaceOrderAPIValidation = (req, res, next) => {
    console.log(req.body)
    const { error } = ValidationSchema.PlaceOrder.validate(req.body);
    if (error) { return res.json({ error: error.details[0].message})}
    next()
}


module.exports = {
    PlaceOrderAPIValidation,
    LoginAPIValidation,
    SinupAPIValidation,
}