import { Request, Response, NextFunction } from "express";
import dbProduct from "../dbSchemas/product";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { IProduct } from "../helper/interfaces";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const image = false;

    const productExists = await dbProduct.findOne({ name: name });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product: IProduct = {
      ...req.body,
    };

    // if (image) {
    //   const { filepath, imageName } = handleImage(image, product.name);
    //   image.mv(filepath);
    //   product.imageName = imageName;
    // }

    const productAdded = await dbProduct.create(product);

    if (!productAdded) {
      return res.status(500).json({ message: "Failed to add new product" });
    }
    res
      .status(201)
      .json({ message: "Product added successfully", product: productAdded });
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.files?.image;
    return res.status(400).json({ message: "error test" });
    // return;
    // const productInfo = {
    //   ...req.body,
    // };
    // productInfo.price = Number(productInfo.price);
    // productInfo.quantity = Number(productInfo.quantity);
    // if (file) {
    //   const { filepath, imageName } = handleImage(file, req.body.name);
    //   file.mv(filepath);
    //   productInfo.imageName = imageName;
    // }

    // const productUpdated = await dbProduct.updateOne(
    //   { _id: req.params.id },
    //   { $set: productInfo }
    // );
    // if (productUpdated.modifiedCount > 0) {
    //   return res.json({
    //     message: "Product updated successfully",
    //   });
    // }
    // res.status(404).json({ message: "Product not found" });
  } catch (error) {
    next(error);
  }
};

export const getProductByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await dbProduct.aggregate([
      { $match: { name: req.params.name } },
      {
        $lookup: {
          from: "products",
          let: { category: "$category", price: "$price" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$category", "$$category"] },
                    { $lt: ["$price", "$$price"] },
                  ],
                },
              },
            },
            {
              $limit: 19,
            },
          ],
          as: "recommends",
        },
      },
    ]);

    if (product.length === 0) {
      return res.status(404).json({
        message: `
      the ${req.params.name} product you're searching for doesn't exist in our records. Please verify the product name and try again`,
      });
    }
    res.json(product[0]);
  } catch (error) {
    next(error);
  }
};
export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;
    const products = await dbProduct.find({ category });
    if (!products)
      return res.status(404).json({ message: "product not found" });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await dbProduct.find({});
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productDeleted = await dbProduct.deleteOne({ _id: req.params.id });

    if (productDeleted.deletedCount > 0) {
      return res.json({ message: `product deleted` });
    }
    res.status(404).json({ message: "product not found" });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.query.name;
    const products = await dbProduct
      .find({
        name: {
          $regex: name,
          $options: "i",
        },
      })
      .limit(7);

    res.json({ products });
  } catch (err) {
    next(err);
  }
};

const handleImage = (_file: File, name: string) => {
  const imageName = name;
  const filepath = path.join(__dirname, "../public/images/", name);
  return {
    imageName,
    filepath,
  };
};
