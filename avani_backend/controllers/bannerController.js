const asyncHandler = require("express-async-handler");
const { Banner, Product } = require("../models");

// @des      Get All Banner
// @route    GET /api/banner
// @Access   Public
const getBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findAll({
    include: ["product"],
  });
  if (banner) {
    res.status(200).json(banner);
  } else {
    res.status(400);
    throw new Error("Banner Not Found");
  }
});
// @des      Get Banner
// @route    GET /api/banner/:uuid
// @Access   Public
const getBannerDetail = asyncHandler(async (req, res) => {
  const banner = await Banner.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (banner) {
    res.status(200).json(banner);
  } else {
    res.status(400);
    throw new Error("Banner Not Found");
  }
});

// @des      Create Banner
// @route    POST /api/banner
// @Access   Private
const createBanner = asyncHandler(async (req, res) => {
  const { name, image, type, product_id } = req.body;

  const newBanner = await Banner.create({
    name,
    image,
    type,
    product_id,
  });

  if (newBanner) {
    res.status(201).json({
      success: true,
      banner: newBanner,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Banner
// @route    PUT /api/banner/:uuid
// @Access   Private
const updateBanner = asyncHandler(async (req, res) => {
  const { name, image, type, product_id } = req.body;

  const banner = await Banner.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (banner) {
    banner.name = name || banner.name;
    banner.image = image || banner.image;
    banner.type = type || banner.type;
    banner.product_id = product_id || banner.product_id;

    const updateBanner = await banner.save();
    if (updateBanner) {
      res.status(201).json({
        success: true,
        data: {
          banner: updateBanner,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});
// @des      Update Banner To Published
// @route    PUT /api/banner/:uuid/published
// @Access   Private
const updateBannerToPublished = asyncHandler(async (req, res) => {
  const { isPublished } = req.body;

  const banner = await Banner.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (banner) {
    banner.isPublished = isPublished;

    const updateBanner = await banner.save();
    if (updateBanner) {
      res.status(201).json({
        success: true,
        message: "Banner Updated",
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Banner
// @route    DELETE /api/Banner/:uuid
// @Access   Private
const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (banner) {
    await banner.destroy();
    res.json({
      success: true,
      message: "Banner Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Banner Not Found");
  }
});

module.exports = {
  getBanner,
  getBannerDetail,
  createBanner,
  updateBanner,
  updateBannerToPublished,
  deleteBanner,
};
