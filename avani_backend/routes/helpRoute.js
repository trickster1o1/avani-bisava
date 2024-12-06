const express = require("express");
const {
  getHelp,
  createHelp,
  deleteHelp,
  updateHelp,
} = require("../controllers/helpController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:tag").get(getHelp);
router.route("/").post(protect, admin, createHelp);
router
  .route("/:uuid")
  .put(protect, admin, updateHelp)
  .delete(protect, admin, deleteHelp);

module.exports = router;
