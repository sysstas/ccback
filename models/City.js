const Sequelize = require('sequelize')
const sequelize = require('../controllers/connection')

const City = sequelize.define('city', {
  cityName: {
    type: Sequelize.STRING
  }
})

module.exports = City
