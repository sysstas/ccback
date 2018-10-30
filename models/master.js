const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')
const City = require('./city')

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
