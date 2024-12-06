const asyncHandler = require("express-async-handler");
const { Help } = require("../models");

// @des      Get One Help
// @route    GET /api/help/:tag
// @Access   Public
const getHelp = asyncHandler(async (req, res) => {
  const help = await Help.findOne({
    where: {
      tag: req.params.tag,
    },
  });
  if (help) {
    res.status(200).json(help);
  } else {
    res.status(400);
    throw new Error("Item Not Found");
  }
});

// @des      Create Help
// @route    POST /api/help
// @Access   Private
const createHelp = asyncHandler(async (req, res) => {
  const { description, tag } = req.body;

  const tagExit = await Help.findOne({
    where: {
      tag: tag,
    },
  });

  if (tagExit) {
    res.status(400);
    throw new Error("Tag With This Already Exit");
  }

  const newHelp = await Help.create({
    description,
    tag,
  });

  if (newHelp) {
    res.status(201).json({
      success: true,
      description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Help
// @route    PUT /api/help/:uuid
// @Access   Private
const updateHelp = asyncHandler(async (req, res) => {
  const { description } = req.body;

  const helpExit = await Help.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (helpExit) {
    helpExit.description = description || helpExit.description;
    const updatedHelp = await helpExit.save();
    if (updatedHelp) {
      res.status(201).json({
        success: true,
        description,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Helo
// @route    DELETE /api/help/:uuid
// @Access   Private
const deleteHelp = asyncHandler(async (req, res) => {
  const Help = await Help.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (Help) {
    await Help.destroy();
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
  getHelp,
  createHelp,
  updateHelp,
  deleteHelp,
};
