var express = require('express')
var app = express()
var mongoose = require('mongoose')


//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())
///




//connecting database
mongoose.connect('mongodb://stas:chdel@ds052649.mlab.com:52649/masters', (err) => {
    if(!err)
        console.log('connected to mongo')
})

// start server
app.listen(3000, function(){
    console.log("server listen on 3000")
})