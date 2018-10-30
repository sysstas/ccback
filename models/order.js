const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const Master = require('./master')
const City = require('./city')
const User = require('./user')

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