const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')
var City = require('../models/City')

const Master = sequelize.define('master', {
  masterName: {
    type: Sequelize.STRING
  },
  masterRating: {
    type: Sequelize.SMALLINT
  }
})

Master.belongsTo(City, { foreignKey: 'cityId' })
module.exports = Master
