var express = require('express')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')

var City = require('./models/City')
var Master = require('./models/Master')
var Client = require('./models/Client')

//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())
app.use(bodyParser.json())


app.get('/masters', async (req, res) => {
  try {
    var masters = await Master.find({}, '-__v')
    res.send(masters)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }      
})

app.get('/cities', async (req, res) => {
  try {
    var cities = await City.find({}, '-__v -_id') 
    res.send(cities)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }  
})

app.get('/clients', async (req, res) => {
  try {
    var clients = await Client.find({}, '-__v -_id') 
    res.send(clients)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }  
})

app.post('/newcity', (req, res) => {
  var newCity = req.body
  var city = new City(newCity)
  city.save((err, result) => {
    if(err)
      console.log('saving city error')
    res.sendStatus(200)
  })  
})

app.post('/newmaster', (req, res) => {
  var newMaster = req.body
  var master = new Master(newMaster)
  master.save((err, result) => {
    if(err)
      console.log('saving master error')
    res.sendStatus(200)
  })  
})

app.post('/freemasters', async (req, res) => {
  try {
    var city = req.body.city
    var date = req.body.date
    var time = req.body.time

    console.log(time)

    var masters = await Master.find({
      $or:[
        /// element where master not work at all yet or not work in choosen day
        {
          city: city,
          busy: {
            $not:{
              $elemMatch: {
                date: date
              }
            }             
          }
        },
        /// elements where master works in choosen date, but is free in specific hours
        {
          city: city,
          busy: { 
            $elemMatch: {
              date: date,
              time: {$nin: time}
            }
          }
        }
      ] 
    }, '-__v')
    //console.log(masters)
    res.send(masters)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }   
})
    

app.post('/updateschedule', (req, res) => {  
  var id = req.body.id
  var date = req.body.date
  var time = req.body.time
  var busyObj = {
    date: date,
    time: time
  }
  Master.findById(id, (err, mast) => { 
    console.log("current busy data")
    console.log(mast.busy)
    /// if there is no data in busy array, we need to assign there busyObj
    if (mast.busy.length == 0) {
      console.log("no busy data")
      mast.busy = busyObj
      mast.save((err, result) => {
        if(err)
          console.log('saving city error')
        res.sendStatus(200)
      })
    ///  if busy array contain some data
    } else{
      console.log("is busy data")
      var workingToday = false
      mast.busy.forEach((element, index, array)=> {
        /// checking if master works tooday we need to merge busy.time and time arrays for avoiding date duplicatig
        if (array[index].date == date) {
          console.log("working today")
          
          workingToday = true

          mast.busy[index].time  = mast.busy[index].time.concat(time)
          console.log(mast.busy[index].time)
          /// will not work if we not mark changes here
          mast.markModified("busy")          
          mast.save((err, result) => {
            if(err)
              console.log('saving city error')
              res.sendStatus(200)
          })        
        }   
      })
      /// if master works on some other day we just push busyObj to busy array
      if(!workingToday){
        console.log("working some other today")
        mast.busy.push(busyObj)
        mast.save((err, result) => {
          if(err)
            console.log('saving city error')
          res.sendStatus(200)
        })
      }
    }    
  })
})

app.post('/sendclient', (req, res) =>{
  var client = req.body
  console.log(client)
  var newClient = new Client(client)
  newClient.save((err, result) => {
    if(err)
      conslole.lgg('saving client error')
    res.sendStatus(200)
  })
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