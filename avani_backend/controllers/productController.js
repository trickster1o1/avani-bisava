const { query } = require("express");
const asyncHandler = require("express-async-handler");
const { Op, Sequelize } = require("sequelize");
const { Product, User } = require("../models");

// @des      Get All Product
// @route    GET /api/product?key=hari
// @Access   Public
const getProucts = asyncHandler(async (req, res) => {
  let key = req.query.key;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 2;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const where = {};
  if (key) where.name = { [Sequelize.Op.like]: `%${key}%` };
  const products = await Product.findAll({
    limit: pageSize,
    offset: pageSize * (page - 1),
    order: [["createdAt", "DESC"]],
    where: {
      ...where,
    },
  });
  const totalItem = await Product.count({
    where: {
      ...where,
    },
  });
  if (products) {
    // res.status(200).json(products);
    res.status(200).json({
      totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
      currentPage: page,
      products,
    });
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

// @des      Get All Product By BestSeller
// @route    GET /api/product/best/seller
// @Access   Public
const getProuctsByBestSeller = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    order: [["bestSeller", "DESC"]],
    where: {
      bestSeller: {
        [Op.gt]: 0,
      },
    },
  });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

// @des      Get All Product By Discount
// @route    GET /api/product/filer/product?discount="true"
// @Access   Public
const getFilterProducts = asyncHandler(async (req, res) => {
  let discount = req.query.discount;
  let bestSeller = req.query.bestSeller;
  let trending = req.query.trending;
  let category = req.query.category;
  let main_category = req.query.main_category;
  let price = req.query.price;
  let search = req.query.search;
  let length = Object.keys(req.query).length;
  const where = {};
  if (bestSeller) where.bestSeller = { [Sequelize.Op.gte]: bestSeller };
  if (discount) where.price_discount = { [Sequelize.Op.gte]: discount };
  if (trending) where.trending = { [Sequelize.Op.gt]: trending };
  if (category) where.child_category = { [Sequelize.Op.eq]: category };
  if (main_category) where.main_category = { [Sequelize.Op.eq]: main_category };
  if (price)
    where.price = {
      [Sequelize.Op.between]: [price.split("-")[0], price.split("-")[1]],
    };
  if (search) where.name = { [Sequelize.Op.like]: `%${search}%` };
  if (length > 0) {
    const products = await Product.findAll({
      where: {
        ...where,
      },
      // order: [["bestSeller", "DESC"]],
      // where: {
      //   bestSeller: {
      //     [Op.gt]: 0,
      //   },
      //   name: {
      //     [Op.like]: "%product%",
      //   },
      // },
      // where: {
      //   [Op.or]: [
      //     {
      //       name: {
      //         [Op.like]: "%product one%",
      //       },
      //     },
      //     {
      //       bestSeller: {
      //         [Op.gt]: 0,
      //       },
      //     },
      //   ],
      // },

      // where: {
      //   bestSeller: {
      //     [Op.gte]: bestSeller,
      //   },
      //   price_discount: {
      //     [Op.gte]: discount,
      //   },
      //   main_category: category,
      //   price: {
      //     [Op.between]: [price.split("-")[0], price.split("-")[1]],
      //   },
      //   name: {
      //     [Op.like]: `%${search}%`,
      //   },
      // },
    });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400);
      throw new Error("Product Not Found");
    }
  } else {
    const products = await Product.findAll({ order: [["createdAt", "DESC"]] });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400);
      throw new Error("Product Not Found");
    }
  }
  // const products = await Product.findAll({
  //   order: [["bestSeller", "DESC"]],
  //   where: {
  //     bestSeller: {
  //       [Op.gt]: 0,
  //     },
  //   },
  // });
  // if (products) {
  //   res.status(200).json(products);
  // } else {
  //   res.status(400);
  //   throw new Error("Product Not Found");
  // }
  // res.send("hello");
});

// @des      Get All Product
// @route    GET /api/product/:uuid
// @Access   Public
const getProuct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});
// @des      Get Product By Slug
// @route    GET /api/product/slug/:slug
// @Access   Public
const getProuctBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    include: ["review"],
    where: {
      slug: req.params.slug,
    },
  });
  if (product) {
    const productOnly = await Product.findOne({
      where: {
        uuid: product.uuid,
      },
    });
    let reviewArray = [];
    for (let i = 0; i < product.review.length; i++) {
      const user = await User.findOne({
        where: {
          id: product.review[i].user_id,
        },
      });
      reviewArray.push({
        rating: product.review[i].rating,
        comment: product.review[i].comment,
        user: user.name,
        postedDate: product.review[i].createdAt,
      });
    }
    res.status(200).json({ product: productOnly, review: reviewArray });
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

// @des      Create Product
// @route    POST /api/product
// @Access   Private
const createProduct = asyncHandler(async (req, res) => {
  const {
    slug,
    name,
    image,
    main_category,
    sub_category,
    child_category,
    price,
    price_discount,
    imageArray,
    isFeatured,
    isPublished,
    description,
  } = req.body;

  const newProduct = await Product.create({
    slug,
    name,
    image,
    main_category,
    sub_category,
    child_category,
    price,
    price_discount,
    imageArray,
    isFeatured,
    isPublished,
    description,
  });

  if (newProduct) {
    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Product
// @route    PUT /api/product/:uuid
// @Access   Private
const updateProduct = asyncHandler(async (req, res) => {
  const {
    slug,
    name,
    image,
    main_category,
    sub_category,
    child_category,
    price,
    price_discount,
    imageArray,
    description,
  } = req.body;

  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (product) {
    product.slug = slug || product.slug;
    product.name = name || product.name;
    product.image = image || product.image;
    product.main_category = main_category || product.main_category;
    product.sub_category = sub_category || product.sub_category;
    product.child_category = child_category || product.child_category;
    product.price = price || product.price;
    product.price_discount = price_discount || product.price_discount;
    product.imageArray = imageArray || product.imageArray;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(201).json({
        success: true,
        data: {
          product: updatedProduct,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});
// @des      Update Product to Featured
// @route    PUT /api/product/:uuid/featured
// @Access   Private
const updateProductToFeatured = asyncHandler(async (req, res) => {
  const { isFeatured } = req.body;

  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (product) {
    product.isFeatured = isFeatured;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(201).json({
        success: true,
        message: "Product Updated To Featured",
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});
// @des      Update Product to Published
// @route    PUT /api/product/:uuid/published
// @Access   Private
const updateProductToPublished = asyncHandler(async (req, res) => {
  const { isPublished } = req.body;

  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (product) {
    product.isPublished = isPublished;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(201).json({
        success: true,
        message: "Product Updated",
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Update Product to Trending
// @route    PUT /api/product/:uuid/trending
// @Access   Public
const updateProductToTrending = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (product) {
    product.trending = product.trending + 1;
    const updateProduct = await product.save();
    if (updateProduct) {
      res.status(201).json({
        success: true,
        message: "Product Added To Trending",
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Delete Product
// @route    DELETE /api/product/:uuid
// @Access   Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (product) {
    await product.destroy();
    res.json({
      success: true,
      message: "Product Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});

module.exports = {
  getProucts,
  getProuctsByBestSeller,
  getProuctBySlug,
  getFilterProducts,
  getProuct,
  createProduct,
  updateProduct,
  updateProductToFeatured,
  updateProductToPublished,
  updateProductToTrending,
  deleteProduct,
};
