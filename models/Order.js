const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

var Master = require('../models/Master')
var City = require('../models/City')
var User = require('../models/User')


const Order = sequelize.define('order', { 
  // cityID: {
  //   type: Sequelize.SMALLINT
  // },
  // masterID: {
  //   type: Sequelize.SMALLINT
  // },
  // userId: {
  //   type: Sequelize.SMALLINT
  // },
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


Order.belongsTo(City, { foreignKey: 'cityId' })
Order.belongsTo(Master, { foreignKey: 'masterId' })
Order.belongsTo(User, { foreignKey: 'userId' })
module.exports = Order;