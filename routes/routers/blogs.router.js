const express = require('express');

const blogRouter = express.Router();

const BlogController = require('../../controllers/blog.controller');

const blogController = new BlogController();

blogRouter.get('/all', blogController.getBlogs);
blogRouter.post(
  '/create',
  blogController.createBlogValidate,
  blogController.createBlog,
);

module.exports = blogRouter;
