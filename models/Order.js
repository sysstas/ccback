const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

var Master = require('../models/Master')
var City = require('../models/City')
var User = require('../models/User')

const Order = sequelize.define('order', {
  date: {
    type: Sequelize.BIGINT
  },
  time: {
    type: Sequelize.SMALLINT
  },
  duration: {
    type: Sequelize.SMALLINT
  }
})

Order.belongsTo(City, { foreignKey: 'cityId' })
Order.belongsTo(Master, { foreignKey: 'masterId' })
Order.belongsTo(User, { foreignKey: 'userId' })
module.exports = Order
