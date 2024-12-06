const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrderToPay,
  updateOrderToDelivered,
  getOrder,
  getOrdersByUserID,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, createOrder);
router.route("/:uuid").get(protect, getOrder);
router.route("/:uuid/pay").put(protect, updateOrderToPay);
router.route("/:uuid/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/user/:uuid").get(protect, getOrdersByUserID);

module.exports = router;
