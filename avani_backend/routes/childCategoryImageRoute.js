const express = require("express");
const {
  getChildCategoryImage,
  createChildCategoryImage,
  updateChildCategoryImage,
  deleteChildCategoryImage,
  getSingleChildCategoryImage,
} = require("../controllers/childCategoryImageController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(getChildCategoryImage)
  .post(protect, admin, createChildCategoryImage);
router
  .route("/:uuid")
  .get(protect, getSingleChildCategoryImage)
  .put(protect, admin, updateChildCategoryImage)
  .delete(protect, admin, deleteChildCategoryImage);

module.exports = router;
