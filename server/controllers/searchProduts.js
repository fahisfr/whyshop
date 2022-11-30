/** @format */

const express = require("express");
const router = express.Router();
const dbProducts = require("../dbSchemas/product");

module.exports = router.get("/:id", async (req, res, next) => {
  try {
    const products = await dbProducts.find({
      $or: [
        {
          name: {
            $regex: req.params.id,
            $options: "i",
          },
        },
      ],
    });
    if (products) {
      return res.json({
        status: true,
        message: "product found",
        data: products,
      });
    }

    res.json({ status: "error", message: "" });
  } catch (err) {
    next(err);
  }
});
