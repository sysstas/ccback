const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const gracefulExit = require('express-graceful-exit')
require('dotenv').config()
const cities = require('./controllers/cities.controller')
const masters = require('./controllers/masters.controller')
const users = require('./controllers/users.controller')
// const schedule = require('./controllers/get.schedule.controller')
const freemasters = require('./controllers/get.free-masters.controller')
const orders = require('./controllers/orders.controller')
const login = require('./controllers/auth.controller')
const register = require('./controllers/register.controller')
const account = require('./controllers/user-account.controller')
const history = require('./controllers/user-history.controller')
const logger = require('./services/logger.service')
// const pptest = require('./controllers/pptest')

// configuring
app.set('port', (process.env.PORT || 5000))

// using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// Routes
app.use('/cities', cities)
app.use('/masters', masters)
app.use('/users', users)
// app.use('/schedule', require('./controllers/get.schedule.controller'))
app.use('/freemasters', freemasters)
app.use('/orders', orders)
app.use('/login', login)
app.use('/register', register)
app.use('/account', account)
app.use('/history', history)
// app.use('/pptest', pptest)

// start server
const server = app.listen(app.get('port'), () => {
  logger.info(`Node app is running on port ${app.get('port')}`)
})

app.use(gracefulExit.middleware(app))

// Graceful shutdown for testing purposes
const shutdown = () => {
  gracefulExit.gracefulExitHandler(app, server, {
    socketio: app.settings.socketio
  })
}

module.exports = { server, shutdown }
