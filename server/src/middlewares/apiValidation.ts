import Joi from "joi";
import { Request, Response, NextFunction } from "express";
const signup = Joi.object({
  name: Joi.string()
    .min(4)
    .max(22)
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9]+$/),
  number: Joi.string()
    .trim()
    .min(10)
    .max(10)
    .required()
    .pattern(/^[0-9]+$/),
  password: Joi.string().trim().min(6).max(22).required(),
  confirmPassword: Joi.string()
    .trim()
    .min(6)
    .max(22)
    .required()
    .valid(Joi.ref("password")),
});
const login = Joi.object({
  number: Joi.string()
    .trim()
    .min(10)
    .max(10)
    .required()
    .pattern(/^[0-9]+$/),
  password: Joi.string().trim().min(6).max(22).required(),
});

const placeOrder = Joi.object({
  address: {
    name: Joi.string().trim().required(),
    number: Joi.string().required(),
    secondaryNumber: Joi.string().required(),
    city: Joi.string().required(),
    landMark: Joi.string().required(),
  },
  paymentType: Joi.valid("cod", "online").required(),
});

const addProduct = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .min(3)
    .max(14)
    .required(),
  category: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
  quantity: Joi.string()
    .pattern(/^[.0-9]+$/)
    .trim()
    .required(),
  price: Joi.string()
    .pattern(/^[0-9]+$/)
    .trim()
    .required(),
});

const changeCartProductQuantity = Joi.object({
  quantity: Joi.number().valid(-0.5, 0.5).required(),
  productId: Joi.string().required(),
});

const editProduct = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .min(3)
    .max(14)
    .required(),
  quantity: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
});
const apiValidation = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { convert: false });
    error
      ? res.status(400).json({ message: error.details[0].message })
      : next();
  };
};
export {
  placeOrder,
  login,
  signup,
  addProduct,
  changeCartProductQuantity,
  editProduct,
  apiValidation,
};
