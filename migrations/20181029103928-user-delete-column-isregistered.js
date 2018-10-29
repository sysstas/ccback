'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'isRegistered')

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'isRegistered', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
