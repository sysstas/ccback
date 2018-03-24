var mongoose = require('mongoose')

module.exports = mongoose.model('Master', {    
      name: String,
      city: String,
      rating: Number,
      busy: Array 
})