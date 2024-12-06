const asyncHandler = require("express-async-handler");
const { Order, Product } = require("../models");

// @des      Get All Order
// @route    GET /api/order
// @Access   Public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Orders Not Found");
  }
});

// @des      Get Single Order
// @route    GET /api/order/:uuid
// @Access   Public
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
});

// @des      Get Order By User Id
// @route    GET /api/order/user/:uuid
// @Access   Private
const getOrdersByUserID = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      userId: req.params.uuid,
    },
    order: [["createdAt", "DESC"]],
  });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Orders Not Found For This User");
  }
});

// @des      Create Orders
// @route    POST /api/order
// @Access   Public of login user
const createOrder = asyncHandler(async (req, res) => {
  const {
    itemPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    userId,
  } = req.body;
  const newOrder = await Order.create({
    itemPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    userId,
  });

  if (newOrder) {
    res.status(201);
    res.json(newOrder);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Order to Pay
// @route    PUT /api/order/:uuid/pay
// @Access   Private of login user
const updateOrderToPay = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(400);
    throw new Error(`order with id:${req.params.uuid} in not found`);
  }
});

// @des      Update Order to Delivered
// @route    PUT /api/order/:uuid/deliver
// @Access   Private of login user
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const orderItems = JSON.parse(order.orderItems);

    for (let i = 0; i < orderItems.length; i++) {
      const product = await Product.findOne({
        where: {
          uuid: orderItems[i].uuid,
        },
      });
      if (product) {
        product.bestSeller = product.bestSeller + 1;
        await product.save();
      }
    }

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(400);
    throw new Error(`order with id:${req.params.uuid} in not found`);
  }
});

module.exports = {
  getOrders,
  getOrdersByUserID,
  getOrder,
  createOrder,
  updateOrderToPay,
  updateOrderToDelivered,
};
