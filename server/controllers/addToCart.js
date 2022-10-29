const Products = require("../dbSchemas/product");
const Cart = require("../dbSchemas/cart");
const ApiErrors = require("../config/apiErrors");

const PrdoductAddToCart = async (req, res, next) => {
  try {
    let Product = await Products.findOne({ _id: req.params.id });
    if (!Product) {
      return res.status(404).send({ message: "Product Not type Found" });
    }
    var cart = await Cart.findOne({ userID: req.user.id });
    if (cart) {
      let check = cart.products.find((x) => x.productID == req.params.id);
      if (check) {
        cart.products.find((x) => x.productID == req.params.id).quantity += 1;
        cart.save();
        res.json({ status: true, message: "Product Quantity Updated" });
      } else {
        cart.products.push({ productID: Product._id, quantity: 1 });
        cart.save();
        res.json({ status: true, message: "Product Added To Cart" });
      }
    } else {
      Cart.create(
        { userID: req.user.id, products: { productID: Product._id } },
        (err, newcart) => {
          if (err) {
            return res.status(500).json({ status: false, message: "Filed Add To Cart" });
          } else {
            res.json({ status: true, message: " Product Added" });
          }
        }
      );
    }
  } catch (err) {
    next(ApiErrors.InternalServerError(err.message));
  }
};

module.exports = PrdoductAddToCart;
