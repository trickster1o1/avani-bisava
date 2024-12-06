const asyncHandler = require("express-async-handler");
const { Review, User, Product, Order } = require("../models");
const { Op, Sequelize } = require("sequelize");

// @des      Get All Data Needed In Dashboar
// @route    GET /api/dashboar
// @Access   Private
const getDashboardData = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
  });
  const products = await Product.findAll({
    order: [["bestSeller", "DESC"]],
    where: {
      bestSeller: {
        [Op.gt]: 0,
      },
    },
  });
  if (orders || products) {
    let dashboardData = [];

    dashboardData.push({
      orderLength: orders.length,
      productSold: products.length,
      revenue: products
        .reduce((acc, item) => acc + item.price * item.bestSeller, 0)
        .toFixed(2),
      totalProductPrice: products
        .reduce((acc, item) => acc + item.price, 0)
        .toFixed(2),
    });
    res.status(200).json(dashboardData);
  } else {
    res.status(400);
    throw new Error("Data Not Found");
  }
  // if (reviews) {
  //   let reviewArray = [];
  //   for (let i = 0; i < reviews.length; i++) {
  //     const user = await User.findOne({
  //       where: {
  //         id: reviews[i].user_id,
  //       },
  //     });
  //     const product = await Product.findOne({
  //       where: {
  //         id: reviews[i].product_id,
  //       },
  //     });
  //     reviewArray.push({
  //       uuid: reviews[i].uuid,
  //       rating: reviews[i].rating,
  //       comment: reviews[i].comment,
  //       user: user.name,
  //       product: product.name,
  //       createdAt: reviews[i].createdAt,
  //     });
  //   }
  //   res.status(200).json(reviewArray);
  // } else {
  //   res.status(400);
  //   throw new Error("Review Not Found");
  // }
});

module.exports = { getDashboardData };
