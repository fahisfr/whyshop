/** @format */

const productType = require("../dbSchemas/categories");
const dbProduct = require("../dbSchemas/product");
const dbOrder = require("../dbSchemas/order");

const home = async (req, res, next) => {
  try {
    Promise.all([productType.find({}), dbProduct.find({})]).then(
      ([types, products]) => {
        res.json({ status: "ok", types, products });
      }
    );
   
  } catch (error) {
    next(error);
  }
};

module.exports = home;
