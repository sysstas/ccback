const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const Admin = sequelize.define('admin', {
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = Admin;
