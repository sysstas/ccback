const express = require('express')
const router = express.Router()

const Master = require('../models/Master')
const City = require('../models/City')
const Order = require('../models/Order')
const User = require('../models/User')

const auth = require('./checkAuth.controller')
const checkAuthenticated = auth.checkAuthenticated
const paymentVerify = require('./paypal.service')

// sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', checkAuthenticated, getAllOrders)
router.post('/', createNewOrder)
// router.put('/:id', editOrder)
router.delete('/:id', checkAuthenticated, deleteOrder)

router.post('/paypalwebhook', changeOrderPaymentStatus)

module.exports = router

/// Functions
// Get all orders
async function getAllOrders (req, res) {
  try {
    const result = await Order.findAll({
      // Choosing only safe fields from Order
      attributes: ['id', 'date', 'time', 'duration', 'paid', 'completed'],
      // Choosing only safe fields from assosiated tables
      include: [
        { model: City, attributes: ['cityName'] },
        { model: Master, attributes: ['masterName'] },
        { model: User, attributes: ['userName', 'userEmail'] }
      ]
    })
    res.status(200).send(result)
  } catch (error) {
    console.log('SERVER', error)
    res.sendStatus(500)
  }
}

// Create new order
async function createNewOrder (req, res) {
  console.log(req.body)
  try {
    const result = await Order.build({
      // id: req.body.id,
      cityId: req.body.cityID,
      masterId: req.body.masterID,
      userId: req.body.user.id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration,
      paid: 0,
      completed: 0
    }).save()
    // prepearing email
    const masterName = req.body.masterName
    const userEmail = req.body.userEmail
    const userName = req.body.userName
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const dateMsg = new Date(req.body.dateMsg).toLocaleDateString('en-US', options)
    const startTime = req.body.time
    const duration = req.body.duration
    const regToken = req.body.user.regToken
    let msg
    // checking user registrarion
    if (!req.body.user.isRegistered) {
      msg = {
        to: userEmail,
        from: 'noreply@cc.com',
        subject: 'Clockwise Clockwork master order',
        text: ' ',
        html: `
            <h3>Hello, ${userName}.</h3>
            <p><strong> Thank you for order.</strong></p>
            <p> Master ${masterName} will come to you at ${startTime}:00 ${dateMsg} and will repear your clock in about ${duration} hours.</p>        
            <p>Please register your account <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/register/${regToken}">click here</a> to confirm order</p> 
            <p>Your <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">Clockwise Clockwork</a></p>
            ` }
      sgMail.send(msg)
    } else {
      msg = {
        to: userEmail,
        from: 'noreply@cc.com',
        subject: 'Clockwise Clockwork master order',
        text: ' ',
        html: `
            <h3>Hello, ${userName}.</h3>
            <p><strong> Thank you for order.</strong></p>
            <p> Master ${masterName} will come to you at ${startTime}:00 ${dateMsg} and will repear your clock in about ${duration} hours.</p>        
            <p>You are registered user</p> 
            <p>You can access your personal area on out site here </p>
            <p>Your <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">Clockwise Clockwork</a></p>
            ` }
      sgMail.send(msg)
    }
    res.status(201).send(result)
  } catch (error) {
    // console.log(error)
    res.sendStatus(500)
  }
}

// Changing order payd status
async function changeOrderPaymentStatus (req, res) {
  try {
    console.log(' 0. Begin')
    const orderId = parseInt(req.body.resource.custom)
    // console.log('SERVER EDIT ORDERyyyyyyyyyyyyyyyyyyyyy', orderId)
    const paymentId = req.body.resource.parent_payment
    // console.log('SERVER EDIT ORDERxxxxxxxxxxxxxxxxxxx', paymentId)

    // Verifying payment
    const isVerified = await paymentVerify(paymentId, orderId)

    console.log(' 2. what the fuck is that thing send? ', isVerified)
    if (isVerified === false) {
      console.log(' 3. SERVER EDIT received false')

      res.sendStatus(200)
      return
    }
    if (isVerified === true) {
      console.log(' 3. SERVER EDIT received true')
      // Changing order status in DB
      const order = await Order.findById(orderId)
      const result = await order.update({
        paid: 1
      })
      // console.log('SERVER db changed ', result)
      res.sendStatus(200)
    }
    if (isVerified === undefined) {
      console.log(' 3. SERVER EDIT received undefined')
      res.sendStatus(200)
    }
  } catch (error) {
    res.sendStatus(200)
  }
}

// Delete order
async function deleteOrder (req, res) {
  try {
    await Order.destroy({ where: { ID: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
}
