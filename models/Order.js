const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const Order = sequelize.define('order', { 
  cityID: {
    type: Sequelize.SMALLINT
  },
  masterID: {
    type: Sequelize.SMALLINT
  },
  clientID: {
    type: Sequelize.SMALLINT
  },
  date: {
    type: Sequelize.BIGINT
  },
  time: {
    type: Sequelize.SMALLINT
  },
  duration: {
    type: Sequelize.SMALLINT
  },
});

module.exports = Order;