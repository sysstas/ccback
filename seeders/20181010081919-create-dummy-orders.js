'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        date: 1540936800000,
        time: 8,
        duration: 3,
        paid: 1,
        completed: 1,
        cityId: 1,
        userId: 1,
        masterId: 3
      },
      {
        date: 1540936800000,
        time: 13,
        duration: 1,
        paid: 0,
        completed: 0,
        cityId: 2,
        userId: 2,
        masterId: 6
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {})
  }
}
