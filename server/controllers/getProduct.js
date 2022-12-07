const dbProduct = require("../dbSchemas/product");

const GetProdcut = async (req, res, next) => {
  try {
    const product = await dbProduct.findOne({ name: req.params.name });

    if (product) return res.json({ status: "ok", product });
    res.json({ status: "error", error: "product found", product });
  } catch (err) {
    next(err);
  }
};

module.exports = GetProdcut;
