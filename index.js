const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const gracefulExit = require('express-graceful-exit');
require('dotenv').config();

// configuring
app.set('port', (process.env.PORT || 5000))

// using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// Routes
app.use('/cities', require('./controllers/cities.controller'))
app.use('/masters', require('./controllers/masters.controller'))
app.use('/users', require('./controllers/users.controller'))
// app.use('/schedule', require('./controllers/get.schedule.controller'))
app.use('/freemasters', require('./controllers/get.free-masters.controller'))
app.use('/orders', require('./controllers/orders.controller'))
app.use('/login', require('./controllers/auth.controller'))
app.use('/register', require('./controllers/register.controller'))
app.use('/account', require('./controllers/user-account.controller'))
app.use('/history', require('./controllers/user-history.controller'))

// start server
var server = app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

app.use(gracefulExit.middleware(app));

// Graceful shutdown for testing purposes
function shutdown() {
  gracefulExit.gracefulExitHandler(app, server, {
      socketio: app.settings.socketio
  }) 
}

// function testenv() {
//   process.env['NODE_ENV'] = 'TEST'
// }



module.exports = {server,shutdown }