const Product = require("../dbSchemas/product");

const GetCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const FindProducts = await Product.find({ category: id });
    if (!FindProducts)
      return res.json({ status: "error", error: "product not found" });
    res.json({ status: "ok", product: FindProducts });
  } catch (error) {
    next(error);
  }
};

module.exports = GetCategory;
