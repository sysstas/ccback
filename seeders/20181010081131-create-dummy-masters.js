'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('masters', [
      {
        masterName: 'Yurij DN',
        masterRating: 5,
        cityId: 1
      },
      {
        masterName: 'Victor DN',
        masterRating: 3,
        cityId: 1
      },
      {
        masterName: 'Jeff DN',
        masterRating: 5,
        cityId: 1
      },
      {
        masterName: 'Dmitrij DN',
        masterRating: 4,
        cityId: 1
      },
      {
        masterName: 'Oleg Zh',
        masterRating: 1,
        cityId: 2
      },
      {
        masterName: 'Olga Zh',
        masterRating: 5,
        cityId: 2
      },
      {
        masterName: 'Yana Zh',
        masterRating: 5,
        cityId: 2
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('masters', null, {})
  }
}
