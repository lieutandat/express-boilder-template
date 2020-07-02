const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-connector');

const Blog = sequelize.define('Blogs', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  writer: {
    type: DataTypes.UUID,
  },
  title: DataTypes.STRING,
  review: DataTypes.STRING,
  body: DataTypes.STRING,
}, {});

Blog.associate = function (models) {
  Blog.belongsTo(models.User, { foreignKey: 'writer', targetKey: 'id'})
};

module.exports.Blog = Blog
