// var mongoose = require('mongoose')

// module.exports = mongoose.model('Client', {    
//       name: String,
//       email: String
// })

const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const Client = sequelize.define('client', {
  ID: {
    type: Sequelize.SMALLINT
  },
  clientName: {
    type: Sequelize.STRING
  },
  clientEmail: {
    type: Sequelize.STRING
  }
})

module.exports = Client;