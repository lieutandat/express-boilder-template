const Sequelize = require('sequelize');
const sequelize = require('../sequelize-connector');

const { User } = require('./user');

const db = {
  Sequelize,
  sequelize,
  User
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db

