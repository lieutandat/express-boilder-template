const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-connector');

const User = sequelize.define(
  'Users',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    activated: DataTypes.BOOLEAN,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    token: DataTypes.STRING,
  },
  {},
);

User.associate = function (models) {
  User.hasMany(models.Blog, {
    as: 'blogs',
    foreignKey: 'writer',
    sourceKey: 'id',
  });
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };

  delete values.hash;
  delete values.updatedBy;
  delete values.salt;
  delete values.token;
  return values;
};

module.exports.User = User;
