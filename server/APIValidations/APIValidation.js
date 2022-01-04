const ValidationSchema =require('./Schemas')

const SinupAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.signup.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()}

const LoginAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.login.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()}
    
const PlaceOrderAPIValidation = (req, res, next) => {
    console.log(req.body)
    var { error } = ValidationSchema.PlaceOrder.validate(req.body);
    if (error) { return res.json({ status:false, message: error.details[0].message})}
    next()}
    
const AddProductAPIValidation = (req, res, next) => {
    console.log(req.file)
    var { error } = ValidationSchema.AddProduct.validate(req.body);
    if (error) { return res.json({ status: false, message: error.details[0].message }) }
    // if (req.file.maimetype !== "image/jpg") {return res.json({ status: false, message: "only jpg file is allowed" })}
    next()}


module.exports = {
    PlaceOrderAPIValidation,
    LoginAPIValidation,
    SinupAPIValidation,
    AddProductAPIValidation
}