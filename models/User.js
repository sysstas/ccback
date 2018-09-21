const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  userEmail: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.SMALLINT
  },
  regToken: {
    type: Sequelize.STRING
  },
  isRegistered: {
    type: Sequelize.SMALLINT
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = User
