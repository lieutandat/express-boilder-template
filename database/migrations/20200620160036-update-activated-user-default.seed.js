require('sequelize');

module.exports = {
  up: (queryInterface) => queryInterface.bulkUpdate('Users', {
    activated: false,
  }),
  down: (queryInterface) => queryInterface.bulkUpdate('Users', {
    activated: null,
  }),
};
