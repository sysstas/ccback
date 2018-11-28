'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('serviceItems', [
      {
        clockSize: 'big',
        workHours: 3,
        price: 12.73
      },
      {
        clockSize: 'medium',
        workHours: 2,
        price: 7.55
      },
      {
        clockSize: 'small',
        workHours: 1,
        price: 3.77
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('serviceItems', null, {})
  }
}
