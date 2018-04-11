var express = require('express')
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')

var City = require('./models/City')
var Master = require('./models/Master')
var Client = require('./models/Client')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//console.log(process.env)

app.set('port', (process.env.PORT || 5000));

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
    var cities = await City.find({}, '-__v') 
    res.send(cities)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }  
})


app.get('/clients', async (req, res) => {
  try {
    var clients = await Client.find({}, '-__v') 
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


app.post('/schedule', async (req, res) => {
  try {
    var city = req.body.city
    var date = req.body.date
    var masters = await Master.find({city: city})
    masters.forEach((master, index, array)=> {
      console.log(master.busy)
      master.busy = master.busy.filter(filerByDate)
      function filerByDate(element){
        return element.date == date
      }
      if (master.busy.length == 0){
        master.busy.push({time: []})
      }
      console.log(master.busy)
    })
    res.send(masters)
  } catch (error) {
    console.log(error)    
    res.sendStatus(500)
  }
})


app.post('/freemasters', async (req, res) => {
  try {
    var city = req.body.city
    var date = req.body.date
    var time = req.body.time
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
  var userName = req.body.userName
  var userEmail = req.body.userEmail
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
      var workingToday = false
      mast.busy.forEach((element, index, array)=> {
        /// checking if master works tooday we need to merge busy.time and time arrays for avoiding date duplicatig
        if (array[index].date == date) {      
          workingToday = true
          mast.busy[index].time  = mast.busy[index].time.concat(time)
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
        mast.busy.push(busyObj)
        mast.save((err, result) => {
          if(err)
            console.log('saving city error')
          res.sendStatus(200)
        })
      }
    }
  })
  // sending email to user 
  var msg = {
    to: userEmail,
    from: 'noreply@cc.com',
    subject: 'Clockwise Clockwork master order',
    text: 'Hello, '+userName+'. Thank you for order.',
    html: '<strong>Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong>'
  }
  console.log("message send")
  sgMail.send(msg)
})


app.post('/sendclient', async (req, res) =>{
  let client = req.body
  let name = req.body.name
  let email = req.body.email 
  let exist = await Client.find({name: name, email: email})
  if (exist.length > 0){
     console.log("exist") 
  } else {
    let newClient = new Client(client)
    newClient.save((err, result) => {
      if(err)
        console.log('saving client error')
      res.sendStatus(200) 
      console.log("User not exist. Added to database")
    })
  }
})


app.post('/delete', (req, res) =>{
  let id = req.body.id
  let db = req.body.db
  if (db === 'client') {   
    Client.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, result){      
      if (!err){
        console.log("Client deleted successfuly")
        res.sendStatus(200)
      }        
    })   
  } else if(db === 'master'){
    Master.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, result){      
      if (!err){
        console.log("Master deleted successfuly")
        res.sendStatus(200)
      } 
    }) 
  } else if(db === 'city'){
    City.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function (err, result){      
      if (!err){
        console.log("City deleted successfuly")
        res.sendStatus(200)
      } 
    }) 
  }
})


app.post('/editclient', (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let email = req.body.email  
  Client.findById(id, (err, client) => {    
    client.name = name
    client.email = email
    client.save((err, result) => {
      if(err)
        console.log('Edit client save error')
      console.log("Client edited successfuly")  
      res.sendStatus(200)
    })
    if (err){ console.log(err)}
  })
})


app.post('/editcity', (req, res) => {
  let id = req.body.id
  let cityName = req.body.cityName
  City.findById(id, (err, city) => {    
    city.cityName = cityName
    city.save((err, result) => {
      if(err)
        console.log('Edit city save error')
      console.log("City edited successfuly")  
      res.sendStatus(200)
    })
    if (err){ console.log(err)}
  })
})


app.post('/editmaster', (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let rating = req.body.rating
  let city = req.body.city
  Master.findById(id, (err, master) => {    
    master.name = name
    master.rating = rating
    master.city = city
    master.save((err, result) => {
      if(err)
        console.log('Edit master save error')
      console.log("Master edited successfuly")  
      res.sendStatus(200)
    })
    if (err){ console.log(err)}
  })
})


//connecting database
mongoose.connect('mongodb://stas:chdel@ds052649.mlab.com:52649/masters', (err) => {
    if(!err)
      console.log('connected to mongo')
})


// start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});