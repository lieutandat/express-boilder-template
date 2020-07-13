'use strict';
const { DataTypes } = require('sequelize');
const {} = require('sequelize');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Users', 'activated', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Users', 'activated');
	},
};
