const asyncHandler = require("express-async-handler");
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

// @des      Get All Admin
// @route    GET /api/admin
// @Access   Private
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.findAll();
  if (admins) {
    res.status(200).json(admins);
  } else {
    res.status(400);
    throw new Error("Admin Not Found");
  }
});

// @des      Auth User and Get Token
// @route    POST /api/admin/login
// @Access   Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({
    where: {
      email,
    },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(201).json({
      success: true,
      admin: admin,
      token: generateToken(admin.uuid),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @des      Create Admin
// @route    POST /api/admin
// @Access   Private
const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExit = await Admin.findOne({
    where: {
      email,
    },
  });

  if (adminExit) {
    res.status(400);
    throw new Error("Admin With This Email Already Exits");
  }

  const salt = await bcrypt.genSalt(10);

  const newAdmin = await Admin.create({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  });

  if (newAdmin) {
    res.status(201).json({
      success: true,
      admin: newAdmin,
      token: generateToken(newAdmin.uuid),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Admin
// @route    PUT /api/admin/:uuid
// @Access   Private
const updateAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const admin = await Admin.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  const salt = await bcrypt.genSalt(10);
  if (admin) {
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    if (password) {
      admin.password = await bcrypt.hash(password, salt);
    }
    const updatedAdmin = await admin.save();
    if (updatedAdmin) {
      res.status(201).json({
        success: true,
        data: {
          admin: updatedAdmin,
          token: generateToken(updatedAdmin.uuid),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Admin
// @route    DELETE /api/admin/:uuid
// @Access   Private
const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (!admin.isSuperAdmin) {
    await admin.destroy();
    res.json({
      success: true,
      message: "Admin Deleted",
    });
  } else {
    res.status(400);
    throw new Error("This User Can not Be Deleted");
  }
});

module.exports = {
  getAdmins,
  authAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
