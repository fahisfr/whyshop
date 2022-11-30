const dbProduct = require("../dbSchemas/product");

const GetProdcut = async (req, res, next) => {
  try {
    const product = await dbProduct.findOne({ name: req.params.id }).exec();
    if (!product) return res.status(404).json({ status: "ok", message: "Product not found" });
    res.json({ status: "error", error: "product found", product });
  } catch (err) {
    next(err);
  }
};

module.exports = GetProdcut;
