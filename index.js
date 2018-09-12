var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')

// configuring
app.set('port', (process.env.PORT || 5000))

// using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// Routes
app.use('/cities', require('./controllers/cities.controller'))
app.use('/masters', require('./controllers/masters.controller'))
app.use('/clients', require('./controllers/clients.controller'))
// app.use('/schedule', require('./controllers/get.schedule.controller'))
app.use('/freemasters', require('./controllers/get.free-masters.controller'))
app.use('/orders', require('./controllers/orders.controller'))
app.use('/login', require('./controllers/auth.controller'))
app.use('/test', require('./controllers/test.controller'))
app.use('/getcurrentclient', require('./controllers/getcurrentclient.controller'))
app.use('/register', require('./controllers/register.controller'))
app.use('/account', require('./controllers/user-account.controller'))
app.use('/history', require('./controllers/user-history.controller'))

// start server
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
