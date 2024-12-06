const express = require("express");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogsByUserId,
  getPublishedBlogs,
  updateBlogToPublished,
} = require("../controllers/blogController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getBlogs).post(createBlog);
router.route("/published").get(getPublishedBlogs);
router.route("/:uuid").put(updateBlog).get(getBlog);
router.route("/:uuid/published").put(protect, admin, updateBlogToPublished);
router.route("/:uuid/:userId").delete(deleteBlog);
router.route("/slug/:slug").get(getBlogBySlug);
router.route("/user/:uuid").get(getBlogsByUserId);

module.exports = router;
