const express = require('express')
const router = express.Router()

const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

const auth = require('../services/checkAuth.service')
const checkAdminAuthorization = auth.checkAdminAuthorization
const paypalService = require('../services/paypal.service')
const paymentVerify = paypalService.paymentVerify
const paymentRefund = paypalService.paymentRefund
const mail = require('../helpers/mail.helper')
const logger = require('../services/logger.service')

router.get('/', checkAdminAuthorization, getAllOrders)
router.post('/', createNewOrder)
router.delete('/:id', checkAdminAuthorization, deleteOrder)
router.post('/paypalwebhook', changeOrderPaymentStatus)
router.post('/refund', refund)

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
        { model: City, attributes: ['cityName'], paranoid: false },
        { model: Master, attributes: ['masterName'], paranoid: false },
        { model: User, attributes: ['userName', 'userEmail'], paranoid: false }
      ]
    })
    // console.log(result)
    res.status(200).send(result)
  } catch (error) {
    // console.log('SERVER', error)
    res.sendStatus(500)
  }
}

// Create new order
async function createNewOrder (req, res) {
  // console.log('createNewOrder')
  try {
    const result = await Order.build({
      cityId: req.body.cityID,
      masterId: req.body.masterID,
      userId: req.body.user.id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration,
      paid: 0,
      completed: 0
    }).save()
    // Sending email
    mail(req)
    res.status(201).send(result)
  } catch (error) {
    // console.log(error)
    res.sendStatus(500)
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

// Changing order payed status
async function changeOrderPaymentStatus (req, res) {
  try {
    console.log(' 0. Begin', req.body)
    const orderId = parseInt(req.body.resource.custom)
    const paymentId = req.body.resource.parent_payment
    const paypalId = req.body.resource.id
    const amount = req.body.resource.amount.total
    // Verifying payment
    const isVerified = await paymentVerify(paymentId, orderId)
    // console.log(' 2. what the fuck is that thing send? ', isVerified)
    if (isVerified === false) {
      // console.log(' 3. SERVER EDIT received false')
      res.sendStatus(200)
      return
    }
    if (isVerified === true) {
      // console.log(' 3. SERVER EDIT received true')
      // Changing order status in DB
      const order = await Order.findById(orderId)
      const result = await order.update({
        paid: 1,
        paypalId: paypalId,
        amount: amount
      })
      res.sendStatus(200)
    }
    if (isVerified === undefined) {
      // console.log(' 3. SERVER EDIT received undefined')
      res.sendStatus(200)
    }
  } catch (error) {
    res.sendStatus(200)
  }
}

async function refund (req, res) {
  logger.info(`Starting refund`)
  try {
    const order = await Order.findById(req.body.id)
    const paypalId = order.dataValues.paypalId
    const data = {
      amount: {
        total: order.dataValues.amount,
        currency: 'USD'
      }
    }
    const isRefunded = await paymentRefund(paypalId, data)
    logger.info(`is refunded ${isRefunded}`)
    if (isRefunded) {
      await order.update({
        paid: 2
      })
      logger.info(`Refund completed`)
      return res.sendStatus(200)
    }
    logger.info(`Refund declined`)
    return res.sendStatus(403)
  } catch (error) {
    logger.error(`Refund Error ${error}`)
  }
  // let pypalId, data
  //
  //  pypalId = req.body '3BK5961788612601X'
  //  data = {
  //   amount: {
  //     total: '10.57',
  //     currency: 'USD'
  //   }
  // }
  // console.log('Starting refund')
  //
  // const isRefunded = await paymentRefund(pypalId, data)
  // console.log('Refund finished', isRefunded)
}
