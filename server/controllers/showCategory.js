/** @format */

const Product = require("../dbSchemas/product");

const GetCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const FindProducts = await Product.find({ category: id });
    if (!FindProducts)
      return res.json({ status: false, message: "Product type  not " });
    res.json({ status: true, message: "product found", product: FindProducts });
  } catch (error) {
    next(error);
  }
};

module.exports = GetCategory;
