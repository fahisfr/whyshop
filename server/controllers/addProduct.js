const Product = require("../dbSchemas/product");

const AddProduct = async (req, res, next) => {
  try {
    const { name, type, quantity, price } = req.body;
    const image = req.files.image;

    const ProductFind = await Product.findOne({ name: name });
    if (ProductFind) {
      return res.json({ status: false, message: "product already exist" });
    }
    const imageName = `${name}${new Date().getTime()}`;
    image.mv("./public/images/" + imageName + ".jpg", async (err) => {
      if (err) return res.json({ status: false, message: "Image not Uploaded " });
      const newProduct = await Product.create({
        name,
        type,
        quantity,
        price,
        imageId: imageName,
      });
      return res.json({ status: true, message: "product added successfully" });
    });
  } catch (error) {
    next(error);
  }
};
module.exports = AddProduct;
