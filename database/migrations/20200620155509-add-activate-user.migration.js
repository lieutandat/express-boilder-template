const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.addColumn('Users', 'activated', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'activated'),
};
