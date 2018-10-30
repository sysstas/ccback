const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const City = sequelize.define('city', {
  cityName: {
    type: Sequelize.STRING
  }
})

module.exports = City
