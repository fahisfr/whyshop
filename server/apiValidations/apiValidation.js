const ValidationSchema =require('./schemas')

const SinupAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.signup.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()}
const LoginAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.login.validate(req.body)
    if (error) return res.status(200).json({ status: false, message: error.details[0].message })
    next()}
    
const PlaceOrderAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.PlaceOrder.validate(req.body);
    if (error) { return res.json({ status:false, message: error.details[0].message})}
    next()}
    
const AddProductAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.AddProduct.validate(req.body);
    if (error) { return res.json({ status: false, message: error.details[0].message }) }
    next()}

const CartProductQuantityAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.ChangeCartProductQuantity.validate(req.body);
    if (error) { return res.json({ status: false, message: error.details[0].message }) }
    next()}
    
const EditProductAPIValidation = (req, res, next) => {
    var { error } = ValidationSchema.EditProduct.validate(req.body);
    if (error) { return res.json({ status: false, message: error.details[0].message }) }
    next()}

module.exports = {
    PlaceOrderAPIValidation,
    LoginAPIValidation,
    SinupAPIValidation,
    AddProductAPIValidation,
    CartProductQuantityAPIValidation,
    EditProductAPIValidation
}