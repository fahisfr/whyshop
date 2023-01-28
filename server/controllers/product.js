const dbProduct = require("../dbSchemas/product");

const addProduct = async (req, res, next) => {
  try {
    const { name, category, quantity, price } = req.body;
    const image = req.files.image;

    const ProductFind = await dbProduct.findOne({ name: name });
    if (ProductFind) {
      return res.json({ status: "error", message: "product already exist" });
    }
    const imageName = `${name}${new Date().getTime()}`;
    image.mv("./public/images/" + imageName + ".jpg", async (err) => {
      if (err)
        return res.json({ status: "error", message: "Image not Uploaded " });
      const newProduct = await dbProduct.create({
        name,
        category,
        quantity,
        price,
        imageId: imageName,
      });
      return res.json({ status: "ok", message: "product added successfully" });
    });
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const { name, quantity, price } = req.body;
    const Edited = await dbProduct.findOneAndUpdate(
      { name: name },
      { $set: { quantity: quantity, price: price } }
    );
    res.json({ success: true, message: "product updated successfully" });
  } catch (error) {
    next(ApiErrors.InternalServerError(error.message));
  }
};

const GetProdcut = async (req, res, next) => {
  try {
    const product = await dbProduct.findOne({ name: req.params.name });

    if (product) return res.json({ status: "ok", product });
    res.json({ status: "error", error: "product not found", product });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    dbProduct.find({}).then((product) => {
      res.json({ status: "ok", products: product });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  GetProdcut,
  getAllProducts,
  editProduct,
};
