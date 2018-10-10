const Sequelize = require('sequelize')
const sequelize = require('../controllers/connection')
const City = require('../models/City')

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
