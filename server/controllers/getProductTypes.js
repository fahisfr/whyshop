const ProductType = require("../dbSchemas/categories");
const Product = require("../dbSchemas/product");
const ApiErrors = require("../config/apiErrors");
module.exports = (req, res, next) => {
  //
  try {
    Promise.all([ProductType.find({}), Product.find({})]).then(([types, products]) => {
      res.json({ types, products });
    });
  } catch (error) {
    next(ApiErrors.InternalServerError(error.message));
  }
};
