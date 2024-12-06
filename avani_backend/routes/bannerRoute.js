const express = require("express");
const {
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  getBannerDetail,
  updateBannerToPublished,
} = require("../controllers/bannerController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getBanner).post(protect, admin, createBanner);
router
  .route("/:uuid")
  .get(getBannerDetail)
  .put(protect, admin, updateBanner)
  .delete(protect, admin, deleteBanner);
router.route("/:uuid/published").put(protect, admin, updateBannerToPublished);

module.exports = router;
