const db = require('../database');

function getBlogs() {
  return db.Blog.findAll();
}

async function createBlog(blog) {
  return db.Blog.bulkCreate([{ ...blog }]);
}

module.exports = {
  getBlogs,
  createBlog,
};
