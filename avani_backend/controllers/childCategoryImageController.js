const asyncHandler = require("express-async-handler");
const { Op, Sequelize } = require("sequelize");
const { ChildCategoryImage } = require("../models");

// @des      Get All ChildCategoryImage
// @route    GET /api/childCategoryImage
// @Access   Public
const getChildCategoryImage = asyncHandler(async (req, res) => {
  let main_category = req.query.main_category;
  let sub_category = req.query.sub_category;
  let length = Object.keys(req.query).length;
  const where = {};
  if (main_category) where.main_category = { [Sequelize.Op.eq]: main_category };
  if (sub_category) where.sub_category = { [Sequelize.Op.eq]: sub_category };

  if (length > 0) {
    const categorys = await ChildCategoryImage.findAll({
      where: {
        ...where,
      },
    });
    if (categorys) {
      res.status(200).json(categorys);
    } else {
      res.status(400);
      throw new Error("Category Not Found");
    }
  } else {
    const categorys = await ChildCategoryImage.findAll({
      order: [["createdAt", "DESC"]],
    });
    if (categorys) {
      res.status(200).json(categorys);
    } else {
      res.status(400);
      throw new Error("Category Not Found");
    }
  }
});

// @des      Get Single ChildCategoryImage
// @route    GET /api/childCategoryImage/:uuid
// @Access   Public
const getSingleChildCategoryImage = asyncHandler(async (req, res) => {
  const categorys = await ChildCategoryImage.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (categorys) {
    res.status(200).json(categorys);
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

// @des      Create Product
// @route    POST /api/product
// @Access   Private
const createChildCategoryImage = asyncHandler(async (req, res) => {
  const { main_category, sub_category, child_category, image } = req.body;

  const categoryExit = await ChildCategoryImage.findOne({
    where: {
      child_category,
    },
  });

  if (categoryExit) {
    throw new Error("Image With This Sub category Already Exit");
  }

  const newChildCategoryImage = await ChildCategoryImage.create({
    main_category,
    sub_category,
    child_category,
    image,
  });

  if (newChildCategoryImage) {
    res.status(201).json({
      success: true,
      product: newChildCategoryImage,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Product
// @route    PUT /api/product/:uuid
// @Access   Private
const updateChildCategoryImage = asyncHandler(async (req, res) => {
  const { main_category, sub_category, child_category, image } = req.body;

  const categoryImage = await ChildCategoryImage.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (categoryImage) {
    categoryImage.image = image || categoryImage.image;
    categoryImage.main_category = main_category || categoryImage.main_category;
    categoryImage.sub_category = sub_category || categoryImage.sub_category;
    categoryImage.child_category =
      child_category || categoryImage.child_category;

    const updatedCategory = await categoryImage.save();
    if (updatedCategory) {
      res.status(201).json({
        success: true,
        data: {
          product: updatedCategory,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Product
// @route    DELETE /api/product/:uuid
// @Access   Private
const deleteChildCategoryImage = asyncHandler(async (req, res) => {
  const childCategoryImage = await ChildCategoryImage.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (childCategoryImage) {
    await childCategoryImage.destroy();
    res.json({
      success: true,
      message: "Category Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Category Not Found");
  }
});

module.exports = {
  getChildCategoryImage,
  getSingleChildCategoryImage,
  createChildCategoryImage,
  updateChildCategoryImage,
  deleteChildCategoryImage,
};
