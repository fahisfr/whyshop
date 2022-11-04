const dbUser = require("../dbSchemas/user");

const PrdoductAddToCart = async (req, res, next) => {
  try {
    const dbResult = await dbUser.updateOne(
      { _id: req.user.id },
      {
        $addToSet: {
          cart: {
            productID: req.params.id,
            quantity: 1,
          },
        },
      }
    );
    console.log(dbResult);
    if (dbResult) {
      return res.json({ status: "ok", message: "product added to the cart" });
    }
    res.json({ status: "error", error: "Failed to add  product to cart" });
  } catch (err) {
    next(err);
  }
};

module.exports = PrdoductAddToCart;
