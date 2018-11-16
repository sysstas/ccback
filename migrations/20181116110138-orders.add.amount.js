'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'amount', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'amount')
  }
};
