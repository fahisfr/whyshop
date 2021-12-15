const Joi = require('joi');

const PlaceOrderSchema = Joi.object({name: Joi.string().required(),
    number: Joi.number().required(),
    address: Joi.string().trim().required(),
    city: Joi.string().required(),
    paymetType: Joi.valid("COD","Online").required(),
})

const PlaceOrderApiValidation = (req, res, next) => {
    console.log(req.body)
    const { error } = PlaceOrderSchema.validate(req.body);
    if (error) {
        res.json({ error: error.details[0].message });
    }
    else {
        next()
    }
}


    
    

module.exports = PlaceOrderApiValidation;