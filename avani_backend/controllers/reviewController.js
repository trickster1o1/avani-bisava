const asyncHandler = require("express-async-handler");
const { Review, User, Product } = require("../models");

// @des      Get All Review
// @route    GET /api/review
// @Access   Public
const getReview = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    order: [["createdAt", "DESC"]],
  });
  if (reviews) {
    let reviewArray = [];
    for (let i = 0; i < reviews.length; i++) {
      const user = await User.findOne({
        where: {
          id: reviews[i].user_id,
        },
      });
      const product = await Product.findOne({
        where: {
          id: reviews[i].product_id,
        },
      });
      reviewArray.push({
        uuid: reviews[i].uuid,
        rating: reviews[i].rating,
        comment: reviews[i].comment,
        user: user.name,
        product: product.name,
        createdAt: reviews[i].createdAt,
      });
    }
    res.status(200).json(reviewArray);
  } else {
    res.status(400);
    throw new Error("Review Not Found");
  }
});
// @des      Get All Review By Product Id
// @route    GET /api/review/product/:id
// @Access   Public
const getAllReviewByProduct = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      product_id: req.params.id,
    },
  });
  if (reviews) {
    let reviewArray = [];
    for (let i = 0; i < reviews.length; i++) {
      const user = await User.findOne({
        where: {
          id: reviews[i].user_id,
        },
      });
      reviewArray.push({
        rating: reviews[i].rating,
        comment: reviews[i].comment,
        user: user.name,
      });
    }
    res.status(200).json(reviewArray);
  } else {
    res.status(400);
    throw new Error("Review Not Found");
  }
});

// @des      Create Review
// @route    POST /api/review
// @Access   Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, user_id, product_id } = req.body;

  const reviewExit = await Review.findOne({
    where: {
      user_id,
      product_id,
    },
  });

  if (reviewExit) {
    throw new Error("You Have Already Review This Product");
  }

  const newReview = await Review.create({
    rating,
    comment,
    user_id,
    product_id,
  });

  if (newReview) {
    res.status(201).json({
      success: true,
      review: newReview,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Review
// @route    PUT /api/review/:uuid
// @Access   Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment, user_id, product_id } = req.body;

  const review = await Review.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (review) {
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    const updateReview = await review.save();
    if (updateReview) {
      res.status(201).json({
        success: true,
        data: {
          banner: updateBanner,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Review
// @route    DELETE /api/review/:uuid
// @Access   Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (review) {
    await review.destroy();
    res.json({
      success: true,
      message: "Review Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Review Not Found");
  }
});

module.exports = {
  getReview,
  getAllReviewByProduct,
  createReview,
  updateReview,
  deleteReview,
};
