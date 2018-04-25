var mongoose = require('mongoose')

module.exports = mongoose.model('Admin', {
    login: String,
    password: String
})