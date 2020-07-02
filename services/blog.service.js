const BlogRespository = require('../repositories/blog.respository');

function getBlogsService() {
    return BlogRespository.getBlogs()
}

/**
 * @function
 * @param {{
        writer: String,
        title: String,
        body: String,
        review: String
    }} data 
 */
function createBlogService(data) {
    return BlogRespository.createBlog({
      writer: data.writer,
      body: data.body,
      review: data.review,
      title: data.title
    })
}

module.exports = {
  getBlogsService,
  createBlogService
}