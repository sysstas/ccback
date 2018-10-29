const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  userEmail: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.SMALLINT
  }
})

module.exports = User
