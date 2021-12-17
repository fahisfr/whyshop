var ValidationSchema =require('./ValidationSchema')

const PlaceOrderApiValidation = (req, res, next) => {
    console.log(req.body)
    const { error } = ValidationSchema.PlaceOrder.validate(req.body);
    if (error) { return res.json({ error: error.details[0].message})}
    else { next() }
}


module.exports = {
    PlaceOrderApiValidation
}