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
  }
  // dateMsg: {
  //   type: Sequelize.STRING
  // },
  // masterName: {
  //   type: Sequelize.STRING
  // },
  // userName: {
  //   type: Sequelize.STRING
  // },
  // userEmail: {
  //   type: Sequelize.STRING
  // }
});

module.exports = Order;