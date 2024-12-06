const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { LovedProduct, Product } = require("../models");

// @des      Create Loved Product
// @route    POST /api/product/love
// @Access   Private
const createLovedProduct = asyncHandler(async (req, res) => {
  const { productId, userId } = req.body;

  const lovedProductExit = await LovedProduct.findOne({
    where: {
      productId,
      userId,
    },
  });

  if (lovedProductExit) {
    throw new Error("This Product is Already Mark As Loved");
  }

  const newLovedProduct = await LovedProduct.create({
    productId,
    userId,
  });

  if (newLovedProduct) {
    // loved value increase
    const product = await Product.findOne({
      where: {
        uuid: newLovedProduct.productId,
      },
    });
    if (product) {
      product.mostLoved = product.mostLoved + 1;
      const updateProduct = await product.save();
      if (updateProduct) {
        res.status(201).json({
          success: true,
          message: "Product Added To Loved",
        });
      }
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
    // end
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});
// @des      Get Loved Product By User ID
// @route    GET /api/product/lovedProduct/:userId
// @Access   Private
const getLovedProductByUserId = asyncHandler(async (req, res) => {
  const lovedProduct = await LovedProduct.findAll({
    where: {
      userId: req.params.userId,
    },
  });

  if (lovedProduct) {
    let proudctArr = [];
    for (let i = 0; i < lovedProduct.length; i++) {
      const product = await Product.findOne({
        where: {
          uuid: lovedProduct[i].productId,
        },
      });
      proudctArr.push(product);
    }
    res.status(201).json({
      success: true,
      // message: lovedProduct,
      products: proudctArr,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
  // end
});

module.exports = { createLovedProduct, getLovedProductByUserId };
