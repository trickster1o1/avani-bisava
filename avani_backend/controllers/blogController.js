const asyncHandler = require("express-async-handler");
const { Op, Sequelize } = require("sequelize");
const { Blog, User } = require("../models");

// @des      Get All Blog
// @route    GET /api/blog
// @Access   Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("Blogs Not Found");
  }
});

// @des      Get All Published Blog Only
// @route    GET /api/blog/isPublished?search=
// @Access   Public
const getPublishedBlogs = asyncHandler(async (req, res) => {
  let search = req.query.search;
  let length = Object.keys(req.query).length;
  const where = {};
  if (search) where.title = { [Sequelize.Op.like]: `%${search}%` };

  if (length > 0) {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        ...where,
      },
    });
    if (blogs) {
      res.status(200).json(blogs);
    } else {
      res.status(400);
      throw new Error("Blogs Not Found");
    }
  } else {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        isPublished: true,
      },
    });
    if (blogs) {
      res.status(200).json(blogs);
    } else {
      res.status(400);
      throw new Error("Blogs Not Found");
    }
  }
});
// @des      Get Single Blog
// @route    GET /api/blog/:uuid
// @Access   Public
const getBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("Blogs Not Found");
  }
});

// @des      Get Blog By Slug
// @route    GET /api/blog/slug/:slug
// @Access   Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    where: {
      slug: req.params.slug,
    },
  });

  if (blog) {
    const user = await User.findOne({
      where: {
        uuid: blog.userId,
      },
    });
    res.status(200).json({ blog, user });
  } else {
    res.status(400);
    throw new Error("Blog Not Found");
  }
});

// @des      Get Blog By UserId
// @route    GET /api/blog/user/:uuid
// @Access   Public
const getBlogsByUserId = asyncHandler(async (req, res) => {
  const blogs = await Blog.findAll({
    where: {
      userId: req.params.uuid,
    },
  });

  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("Blog Not Found");
  }
});

// @des      Create blog
// @route    POST /api/blog
// @Access   Private
const createBlog = asyncHandler(async (req, res) => {
  const { slug, title, image, description, userId } = req.body;

  const newBlog = await Blog.create({
    slug,
    title,
    image,
    description,
    userId,
  });

  if (newBlog) {
    res.status(201).json({
      success: true,
      product: newBlog,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @des      Update Blog
// @route    PUT /api/blog/:uuid
// @Access   Private
const updateBlog = asyncHandler(async (req, res) => {
  const { slug, title, image, description } = req.body;

  const blog = await Blog.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (blog) {
    blog.slug = slug || blog.slug;
    blog.title = title || blog.title;
    blog.image = image || blog.image;
    blog.description = description || blog.description;

    const updatedBlog = await blog.save();
    if (updatedBlog) {
      res.status(201).json({
        success: true,
        data: {
          product: updatedBlog,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});
// @des      Update Blog To Published
// @route    PUT /api/blog/:uuid/published
// @Access   Private
const updateBlogToPublished = asyncHandler(async (req, res) => {
  const { isPublished } = req.body;
  const blog = await Blog.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (blog) {
    blog.isPublished = isPublished;

    const updatedBlog = await blog.save();
    if (updatedBlog) {
      res.status(201).json({
        success: true,
        message: "Blog Updated To Published",
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  }
});

// @des      Delete Blog By User
// @route    DELETE /api/blog/:uuid/:userId
// @Access   Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    where: {
      uuid: req.params.uuid,
      userId: req.params.userId,
    },
  });

  if (blog) {
    await blog.destroy();
    res.json({
      success: true,
      message: "Blog Deleted",
    });
  } else {
    res.status(400);
    throw new Error("Blog Not Found");
  }
});

module.exports = {
  getBlogs,
  getBlog,
  getPublishedBlogs,
  getBlogBySlug,
  getBlogsByUserId,
  createBlog,
  updateBlog,
  updateBlogToPublished,
  deleteBlog,
};
