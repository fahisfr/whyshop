const Joi = require('joi');

const PlaceOrder = Joi.object({name: Joi.string().required(),
    number: Joi.number().required(),
    address: Joi.string().trim().required(),
    city: Joi.string().required(),
    paymetType: Joi.valid("COD","Online").required(),
})

module.exports = {
    PlaceOrder
}