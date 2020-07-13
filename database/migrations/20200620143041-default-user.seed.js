const uuid = require('uuid').v4;
('use strict');

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					id: 'f98ac3a9-fe81-4d83-89f4-a8f1c865b3bc',
					firstName: 'Test',
					lastName: 'Test',
					email: 'test@gmail.com',
					hash:
						'20d01bee7b1557b50d3420c85db5844e2db1ee10757fbd9c953cecab114f74d8f0406b8ff7aa9b013f9636f63a852d29dcb22121e406894b93a8fe2cd5cc9452',
					salt: 'd71d95c706c285f3',
					updatedAt: '2020-06-20 15:37:14',
					createdAt: '2020-06-20 15:37:14',
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return QueryInterface.bulkDelete('Users', {
			where: { id: ['f98ac3a9-fe81-4d83-89f4-a8f1c865b3bc'] },
		});
	},
};
