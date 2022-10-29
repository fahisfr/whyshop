const dbProduct = require("../dbSchemas/product");

const findProduct = async (req, res, next) => {
  try {
    dbProduct.find({}).then((product) => {
      res.json({ status: true, message: "Product List", products: product });
    });
  } catch (err) {
    next(err);
  }
};
module.exports = findProduct;
