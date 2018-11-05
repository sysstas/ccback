'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        userName: 'Admin',
        userEmail: 'admin@example.com',
        isAdmin: 1
      },
      {
        userName: 'Dummy client',
        userEmail: 'Dummy@client.com',
        isAdmin: 0
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
