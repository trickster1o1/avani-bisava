const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Admin } = require("../models");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const request = req.headers.authorization;
  if (request && request.startsWith("Bearer")) {
    try {
      token = request.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findOne({
        where: {
          uuid: decoded.uuid,
        },
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

const admin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
};

// const superAdmin = (req, res, next) => {
//   if (req.admin && req.admin.isSuperAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized as an Super Admin");
//   }
// };

module.exports = { protect, admin };
