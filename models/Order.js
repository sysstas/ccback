const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const Master = require('../models/Master')
const City = require('../models/City')
const User = require('../models/User')

const Order = sequelize.define('order', {
  date: {
    type: Sequelize.BIGINT
  },
  time: {
    type: Sequelize.SMALLINT
  },
  duration: {
    type: Sequelize.SMALLINT
  },
  paid: {
    type: Sequelize.SMALLINT
  },
  completed: {
    type: Sequelize.SMALLINT
  }
})

Order.belongsTo(City, { foreignKey: 'cityId' })
Order.belongsTo(Master, { foreignKey: 'masterId' })
Order.belongsTo(User, { foreignKey: 'userId' })
module.exports = Order
