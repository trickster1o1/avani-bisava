const express = require("express");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactUsController");

const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getContact).post(protect, admin, createContact);
router
  .route("/:uuid")
  .put(protect, admin, updateContact)
  .delete(protect, admin, deleteContact);

module.exports = router;
