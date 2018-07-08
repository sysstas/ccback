const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const City = sequelize.define('city', {
  ID: {
    type: Sequelize.SMALLINT
  },
  cityName: {
    type: Sequelize.STRING
  }
})

module.exports = City;
