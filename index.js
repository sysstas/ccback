var express = require('express')
var app = express()
//var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
//var mysql = require('mysql');
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://ccadmin:chdelsss@ccdb.cyvbhrm19emn.eu-west-1.rds.amazonaws.com:3306/ccdb');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

//   // const City = sequelize.define('city', {
//   //   ID: {
//   //     type: Sequelize.SMALLINT
//   //   },
//   //   cityName: {
//   //     type: Sequelize.STRING
//   //   }
//   // });

//   module.exports = sequelize;
// //models
// var City = require('./models/City')
// var Master = require('./models/Master')
// var Client = require('./models/Client')
// var Order = require('./models/Order')

//configuring
app.set('port', (process.env.PORT || 5000));

//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// Routes
app.use('/cities', require('./controllers/cities.controller'))
app.use('/masters', require('./controllers/masters.controller'))
app.use('/clients', require('./controllers/clients.controller'))
// app.use('/schedule', require('./controllers/get.schedule.controller'))
// app.use('/freemasters', require('./controllers/get.free-masters.controller'))
app.use('/orders', require('./controllers/orders.controller'))
// app.use('/login', require('./controllers/auth.controller'))
// app.use('/getcurrentclient', require('./controllers/getcurrentclient.controller'))

//connecting database
// mongoose.connect('mongodb://stas:chdel@ds052649.mlab.com:52649/masters', (err) => {
//     if(!err)
//       console.log('connected to mongo')
// })

// start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});