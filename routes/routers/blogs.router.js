const express = require('express');
const blogRouter = express.Router();
const authorizeHandler = require('../middlewares/authorize');

const BlogController = require('../../controllers/blog.controller');
const blogController = new BlogController();

const excludeAuthen = [];
// blogRouter.use(authorizeHandler(excludeAuthen));

blogRouter.get('/all', blogController.getBlogs);
blogRouter.post(
	'/create',
	blogController.createBlogValidate,
	blogController.createBlog
);

module.exports = blogRouter;
