const express = require("express");
const {
  getProucts,
  getProuctsByBestSeller,
  getProuctBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProuct,
  updateProductToFeatured,
  updateProductToPublished,
  getFilterProducts,
  updateProductToTrending,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getProucts).post(protect, admin, createProduct);
router
  .route("/:uuid")
  .get(getProuct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/slug/:slug").get(getProuctBySlug);
router.route("/:uuid/featured").put(protect, admin, updateProductToFeatured);
router.route("/:uuid/published").put(protect, admin, updateProductToPublished);
router.route("/:uuid/trending").put(updateProductToTrending);
router.route("/best/seller").get(getProuctsByBestSeller);
router.route("/filter/product").get(getFilterProducts);

module.exports = router;
