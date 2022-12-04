/** @format */

const dbUser = require("../dbSchemas/user");

const PrdoductAddToCart = async (req, res, next) => {
  try {
    const productAdded = await dbUser.updateOne(
      { _id: req.user.id },
      {
        $addToSet: {
          cart: {
            productId: req.params.id,
            quantity: 1,
          },
        },
      }
    );
    
    if (productAdded.modifiedCount > 0) {
      res.json({ status: "ok", message: "product added to  cart" });
      return;
    }

    res.json({ status: "error", error: "Failed to add  item to cart" });
  } catch (err) {
    next(err);
  }
};

module.exports = PrdoductAddToCart;
