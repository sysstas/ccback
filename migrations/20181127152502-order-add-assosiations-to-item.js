'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'orders',
      'itemId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'serviceItems',
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
      'itemId'
    )
  }
}
