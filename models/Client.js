var mongoose = require('mongoose')

module.exports = mongoose.model('Client', {    
      name: String,
      email: String
})