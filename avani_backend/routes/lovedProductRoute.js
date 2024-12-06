const express = require("express");
const {
  createLovedProduct,
  getLovedProductByUserId,
} = require("../controllers/lovedProductController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createLovedProduct);
router.route("/:userId").get(protect, getLovedProductByUserId);

module.exports = router;
