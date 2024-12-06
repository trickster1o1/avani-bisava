const express = require("express");
const {
  getAboutUs,
  createAboutus,
  updateAboutUs,
  deleteAboutUs,
} = require("../controllers/aboutUsController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getAboutUs).post(protect, admin, createAboutus);
router
  .route("/:uuid")
  .put(protect, admin, updateAboutUs)
  .delete(protect, admin, deleteAboutUs);

module.exports = router;
