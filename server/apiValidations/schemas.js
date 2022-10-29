const Joi = require('joi');

const signup = Joi.object({
    name: Joi.string().min(4).max(22).required().trim().pattern(/^[a-zA-Z0-9]+$/),
    number: Joi.string().trim().min(10).max(10).required().pattern(/^[0-9]+$/),
    password: Joi.string().trim().min(6).max(22).required(),
    confirmPassword: Joi.string().trim().min(6).max(22).required().valid(Joi.ref('password')),
});
const login = Joi.object({
    number:Joi.string().trim().min(10).max(10).required().pattern(/^[0-9]+$/),
    password: Joi.string().trim().min(6).max(22).required(),
});

const PlaceOrder = Joi.object({
    name: Joi.string().trim().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    lademark: Joi.string().required(),
    paymentType: Joi.valid("COD","Online").required(),
})

const AddProduct = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9]+$/).min(3).max(14).required(),
    type: Joi.string().pattern(/^[a-zA-Z0-9]+$/).required(),
    quantity: Joi.string().pattern(/^[.0-9]+$/).trim().required(),
    price: Joi.string().pattern(/^[0-9]+$/).trim().required(),
})

const ChangeCartProductQuantity = Joi.object({
    quantity: Joi.number().valid(-.5,.5).required(),
})

const EditProduct = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9]+$/).min(3).max(14).required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),

})


module.exports = {
    PlaceOrder,
    login,
    signup,
    AddProduct,
    ChangeCartProductQuantity,
    EditProduct
}   