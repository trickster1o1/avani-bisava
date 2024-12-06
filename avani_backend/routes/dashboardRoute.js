const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, admin, getDashboardData);

module.exports = router;
