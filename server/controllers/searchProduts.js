const dbProducts = require("../dbSchemas/product");

const searchProducts = async (req, res, next) => {
  try {
    const products = await dbProducts.find({
      $or: [
        {
          name: {
            $regex: req.params.name,
            $options: "i",
          },
        },
      ],
    });

    return res.json({ status: "ok", products });
  } catch (err) {
    next(err);
  }
};

module.exports = searchProducts;
