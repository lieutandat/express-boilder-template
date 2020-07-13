const { celebrate, Joi } = require('celebrate');

const BaseController = require('./base-controller');
const blogService = require('../services/blog.service');

class BlogController extends BaseController {
	constructor() {
		super(module);
	}

	getBlogs = this.asyncHandler(async (req, res) => {
		const blogs = await blogService.getBlogsService();
		return this.ok(res, blogs);
	});

	createBlog = this.asyncHandler(async (req, res) => {
		const user = req.body;
		const result = await blogService.createBlogService(user);
		return this.ok(res, result);
	});

	createBlogValidate = celebrate({
		body: {
			title: Joi.string().required(),
			review: Joi.string().required(),
			body: Joi.string().required(),
			writer: Joi.string().required(),
		},
	});
}

module.exports = BlogController;
