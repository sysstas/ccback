var express = require('express')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())
///

var masters = [
    { id: 1,
      name: "Andrew",
      city: "Dnipro",
      rating: 5,
      busy: [
        {
          date:1521496800000,
          time: [8,9,10]
        },
        {
          date:1521410400000,
          time: [8,9,10]
        },
      ]        
    },
    { id: 2,
      name: "Victor",
      city: "Dnipro",
      rating: 3,
      busy: [
        {
        date:1521410400000,
        time: [10,11,12]
        }
      ]        
    },         
    { id: 3,
      name: "Orest",
      city: "Zhytomyr",
      rating: 5,
      busy: [
        {
        date:1521410400000,
        time: [13,14,15]
        }
      ]        
    },
    { id: 4,
      name: "Lyashko",
      city: "Zhytomyr",
      rating: 2,
      busy: [
        {
        date:1521410400000,
        time: [8,9,10,16,17]
        }
      ]        
    }        
  ]

app.get('/masters', (req, res) => {
    res.send(masters)
})


//connecting database
mongoose.connect('mongodb://stas:chdel@ds052649.mlab.com:52649/masters', (err) => {
    if(!err)
        console.log('connected to mongo')
})

// start server
app.listen(3000, function(){
    console.log("server listen on 3000")
})