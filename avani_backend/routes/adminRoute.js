const express = require("express");
const {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  authAdmin,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, admin, getAdmins).post(createAdmin);
router
  .route("/:uuid")
  .put(protect, admin, updateAdmin)
  .delete(protect, admin, deleteAdmin);

router.route("/login").post(authAdmin);

module.exports = router;
