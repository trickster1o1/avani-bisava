const jwt = require("jsonwebtoken");

const generateToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
