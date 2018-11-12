'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'deletedAt', {
      type: Sequelize.DATE,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'deletedAt')
  }
};
