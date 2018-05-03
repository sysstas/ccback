var mongoose = require('mongoose')

module.exports = mongoose.model('Order', {    
    //   name: String,
    //  
    //   rating: Number,
    //   busy: Array 
    date: String,
    time: Number,
    duration: Number,
    masterName: String,
    masterId: String,
    clientEmail: String,
    clientName: String,
    city: String
})