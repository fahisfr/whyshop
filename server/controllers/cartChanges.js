const dbUser = require("../dbSchemas/user");
const dbProducts = require("../dbSchemas/product");
const ApiErrors = require("../config/apiErrors");

const changeProductQuantity = async (req, res, next) => {
  try {
    const dbResult = dbUser.updateOne(
      { _id: req.user.id },
      {
        quantity: {
          $sum: req.body.quantity,
        },
      }
    );

    if (dbResult) {
      return res.json({ status: "ok", message: "Product quantity updated successfully" });
    }

    res.json({ status: "error", error: "faild to update quantity" });
  } catch (error) {
    next(error);
  }
};

const removeCartProduct = async (req, res, next) => {
  try {
    const dbResult = await dbUser.updateOne(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          cart: {
            productID: req.params.id,
          },
        },
      }
    );

    if (dbResult) {
      return res.json({ status: "ok", message: "Product removed from Cart successfully" });
    }

    res.json({ status: "error", error: "faild to remove product from cart" });
  } catch (error) {
    next(error);
  }
};

const removeAllCartProducts = async (req, res, next) => {
  try {
    const dbResult = await dbCarts.deleteOne({ userID: req.user.id });
    if (dbResult) {
      return res.json({
        status: "ok",
        message: "All products removed from Cart successfully",
      });
    }
    res.json({ status: "error", error: "faild to" });
  } catch (error) {
    next(error);
  }
};
module.exports = { changeProductQuantity, removeCartProduct, removeAllCartProducts };
