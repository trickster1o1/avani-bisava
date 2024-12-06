const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateToken } = require("../utils/generateToken");

// @des      Get All user
// @route    GET /api/user
// @Access   Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Users Not Found");
  }
});

// @des      Auth user
// @route    POST /api/user/login
// @Access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      success: true,
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user.uuid),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @des      Create user
// @route    POST /api/user
// @Access   Public
const createUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  const userExit = await User.findOne({
    where: {
      email,
    },
  });
  // console.log("object", userExit);

  if (userExit) {
    throw new Error("User With This Email Already Exits");
  }

  const salt = await bcrypt.genSalt(10);

  const newUser = await User.create({
    name,
    phone,
    email,
    password: await bcrypt.hash(password, salt),
  });

  if (newUser) {
    res.status(201).json({
      success: true,
      user: newUser,
      token: generateToken(newUser.uuid),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update User
// @route    PUT /api/user/:uuid
// @Access   Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  const salt = await bcrypt.genSalt(10);
  if (user) {
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(201).json({
        success: true,
        data: {
          user: updatedUser,
          token: generateToken(updatedUser.uuid),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

module.exports = { getUsers, authUser, createUser, updateUser };
