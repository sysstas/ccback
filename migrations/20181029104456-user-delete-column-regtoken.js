'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'regToken')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'regToken', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
