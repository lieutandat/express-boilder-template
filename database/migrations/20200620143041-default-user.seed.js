const uuid = require('uuid').v4
'use strict';

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
   return queryInterface.bulkInsert('Users', [
    {
      "id": "f98ac3a9-fe81-4d83-89f4-a8f1c865b3bc",
      "firstName": "Dat",
      "lastName": "Lieu",
      "email": "lieutandat@gmail.com",
      "hash": "12",
      "salt": "1",
      "updatedAt": "2020-06-20 15:37:14",
      "createdAt": "2020-06-20 15:37:14"
    }
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return QueryInterface.bulkDelete('Users', {
     where: { id: ["f98ac3a9-fe81-4d83-89f4-a8f1c865b3bc"]}
   })
  }
};
