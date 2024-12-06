const express = require("express");
const {
  getUsers,
  createUser,
  authUser,
  updateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(createUser);
router.route("/:uuid").put(protect, updateUser);
router.route("/login").post(authUser);

module.exports = router;
