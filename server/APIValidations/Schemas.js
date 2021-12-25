
const Joi = require('joi');

const signup = Joi.object({
    name: Joi.string().min(4).max(22).required().trim().pattern(/^[a-zA-Z0-9]+$/),
    number: Joi.string().trim().min(9).max(11).required().pattern(/^[0-9]+$/),
    password: Joi.string().trim().min(6).max(22).required(),
    confirmPassword: Joi.string().trim().min(6).max(22).required().valid(Joi.ref('password')),
});
const login = Joi.object({
    //set joi for number validation for phone number length 10 or 11
    number:Joi.string().trim().min(9).max(11).required().pattern(/^[0-9]+$/),
    password: Joi.string().trim().min(6).max(22).required(),
});

const PlaceOrder = Joi.object({
    name: Joi.string().trim().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    lademark: Joi.string().required(),
    paymentType: Joi.valid("COD","Online").required(),
})


module.exports = {
    PlaceOrder,
    login,
    signup
}   