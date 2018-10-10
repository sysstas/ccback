'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'orders',
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
      .then(() => {
        return queryInterface.addColumn(
          'orders',
          'userId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
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
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'orders',
      'cityId'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'userId'
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'masterId'
        )
      })
  }
}
