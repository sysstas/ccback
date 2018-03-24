var mongoose = require('mongoose')

module.exports = mongoose.model('City', {
    cityName: String
})