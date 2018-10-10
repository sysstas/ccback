'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'masters',
      'cityId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'masters',
      'cityId'
    )
  }
}
