const asyncHandler = require("express-async-handler");
const { AboutUs } = require("../models");

// @des      Get About Us
// @route    GET /api/aboutus
// @Access   Public
const getAboutUs = asyncHandler(async (req, res) => {
  const about = await AboutUs.findAll();
  if (about) {
    res.status(200).json(about);
  } else {
    res.status(400);
    throw new Error("Item Not Found");
  }
});

// @des      Create About
// @route    POST /api/aboutus
// @Access   Private
const createAboutus = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const newAboutUs = await AboutUs.create({
    title,
    description,
    image,
  });

  if (newAboutUs) {
    res.status(201).json({
      success: true,
      aboutUs: newAboutUs,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Aboutus
// @route    PUT /api/aboutus/:uuid
// @Access   Private
const updateAboutUs = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const aboutUsExit = await AboutUs.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (aboutUsExit) {
    aboutUsExit.title = title || aboutUsExit.title;
    aboutUsExit.description = description || aboutUsExit.description;
    aboutUsExit.image = image || aboutUsExit.image;
    const updatedAboutUs = await aboutUsExit.save();
    if (updatedAboutUs) {
      res.status(201).json({
        success: true,
        contactUs: updatedAboutUs,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete ContactUs
// @route    DELETE /api/contactus/:uuid
// @Access   Private
const deleteAboutUs = asyncHandler(async (req, res) => {
  const aboutUs = await AboutUs.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (aboutUs) {
    await aboutUs.destroy();
    res.json({
      success: true,
      message: "Item Deleted",
    });
  } else {
    res.status(400);
    throw new Error("This Item Can not Be Deleted");
  }
});

module.exports = {
  getAboutUs,
  createAboutus,
  updateAboutUs,
  deleteAboutUs,
};
