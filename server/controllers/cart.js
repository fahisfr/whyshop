const dbUser = require("../dbSchemas/user");

const addToCart = async (req, res, next) => {
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
    console.log(productAdded);
    if (productAdded.modifiedCount > 0) {
      return res.json({ status: "ok" });
    }

    res.json({ status: "error", error: "Failed to add  item to cart" });
  } catch (err) {
    next(err);
  }
};

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
        arrayFilters: [{ "ind.productId": productId }],
      }
    );

    if (dbResult.modifiedCount > 0) {
      return res.json({ status: "ok" });
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
            productId: req.params.id,
          },
        },
      }
    );

    if (dbResult.modifiedCount > 0) {
      return res.json({
        status: "ok",
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
      });
    }
    res.json({ status: "error", error: "" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  changeProductQuantity,
  removeCartProduct,
  removeAllCartProducts,
  addToCart,
};