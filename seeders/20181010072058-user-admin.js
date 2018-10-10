'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        userName: 'Admin',
        userEmail: 'admin@example.com',
        isAdmin: 1,
        regToken: 1,
        isRegistered: 1,
        password: '$2b$10$m2xQWuYPvnPsdBAo1jDYxOD.r95efh.GiGN/Z5xprfGR.O9dyHQfG'
      },
      {
        userName: 'Dummy client',
        userEmail: 'Dummy@client.com',
        isAdmin: 0,
        regToken: 1,
        isRegistered: 0,
        password: null
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
