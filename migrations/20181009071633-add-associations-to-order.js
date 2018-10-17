'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'orders',
      'masterId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'masters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'orders',
      'masterId'
    )
  }
}
