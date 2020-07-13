'use strict';
require('sequelize');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkUpdate('Users', {
			activated: false,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkUpdate('Users', {
			activated: null,
		});
	},
};
