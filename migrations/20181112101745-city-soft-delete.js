'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cities', 'deletedAt', {
      type: Sequelize.DATE,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cities', 'deletedAt')
  }
};
