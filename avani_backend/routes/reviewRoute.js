const express = require("express");
const {
  getReview,
  createReview,
  deleteReview,
  getAllReviewByProduct,
} = require("../controllers/reviewController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getReview).post(protect, createReview);
router.route("/product/:id").get(getAllReviewByProduct);
router.route("/:uuid").delete(protect, admin, deleteReview);

module.exports = router;
