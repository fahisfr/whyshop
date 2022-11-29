/** @format */

const dbUser = require("../dbSchemas/user");

const changeProductQuantity = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { quantity, productId },
    } = req;

    const dbResult = await dbUser.updateOne(
      { _id: id },
      {
        $inc: {
          "cart.$[ind].quantity": quantity,
        },
      },
      {
        arrayFilters: [{ "ind.productID": productId }],
      }
    );

    if (dbResult.modifiedCount > 0) {
      return res.json({
        status: "ok",
        message: "Product quantity updated successfully",
      });
    }

    res.json({ status: "error", error: "faild to update quantity" });
  } catch (error) {
    next(error);
  }
};

const removeCartProduct = async (req, res, next) => {
  try {
    console.log(req.params);
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

    if (dbResult.modifiedCount) {
      return res.json({
        status: "ok",
        message: "Product removed from Cart successfully",
      });
    }

    res.json({ status: "error", error: "faild to remove product from cart" });
  } catch (error) {
    next(error);
  }
};

const removeAllCartProducts = async (req, res, next) => {
  try {
    const dbResult = await dbUser.updateOne(
      { _id: req.user.id },
      {
        $set: {
          cart: [],
        },
      }
    );
    if (dbResult.modifiedCount > 0) {
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
module.exports = {
  changeProductQuantity,
  removeCartProduct,
  removeAllCartProducts,
};
