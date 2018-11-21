const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const ServiceItem = sequelize.define('serviceItem', {
  clockSize: {
    type: Sequelize.STRING
  },
  workHours: {
    type: Sequelize.SMALLINT
  },
  price: {
    type: Sequelize.FLOAT
  }
}, { paranoid: true })

ServiceItem.getAllSafe = function () {
  return ServiceItem.findAll({ attributes: ['id', 'clockSize', 'workHours', 'price'] })
}
module.exports = ServiceItem
