var express = require('express')
var router = express.Router()
// var Admin = require('../models/Admin')
// var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var User = require('../models/User')
// var Client = require('../models/Client')

var auth = require('./checkAuth.controller')
var checkAuthenticated = auth.checkAuthenticated


// sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', checkAuthenticated, getAllOrders)
router.post('/', createNewOrder)
router.put('/:id', checkAuthenticated, editOrder)
router.delete('/:id', checkAuthenticated, deleteOrder)

module.exports = router

/// Functions
// Get all orders
async function getAllOrders (req, res) {
  try {
    await
    Order.findAll({ include: [City, Master, User] }).then(result => {

          // console.log("Getting order information ", result[0].dataValues)
      let orderRes = []
      result.forEach(element => {
        // console.log("ELEMENT",element)
        let arr = {
          id: element.dataValues.id,
          date: element.dataValues.date,
          time: element.dataValues.time,
          duration: element.dataValues.duration,
          city:  element.dataValues.city.dataValues.cityName,
          master:  element.dataValues.master.dataValues.masterName,
          userName:  element.dataValues.user.dataValues.userName,
          userEmail:  element.dataValues.user.dataValues.userEmail
       }
       orderRes.push(arr)
      })
      //  console.log("orderRes", orderRes)
      res.status(200).send(orderRes)
    })
  } catch (error) {
    // console.log(error)
    res.sendStatus(500)
  }
}

// Create new order
async function createNewOrder (req, res) {
  try {
    await
    // console.log("REQQUEST BODY",req.body)
    Order.build({
      cityId: req.body.cityID,
      masterId: req.body.masterID,
      userId: req.body.user.id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration
    })
      .save()
      .then(result => {
        //prepearing email
        let masterName = req.body.masterName
        let userEmail = req.body.userEmail
        let userName = req.body.userName
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        let dateMsg = new Date(req.body.dateMsg).toLocaleDateString('en-US', options)
        let startTime = req.body.time
        let duration = req.body.duration
        let regToken = req.body.user.regToken
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
            <p>Please register your account <a href="http://localhost:4200/register/${regToken}">click here</a> to confirm order</p> 
            <p>Your <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">Clockwise Clockwork</a></p>
            ` }
          // sgMail.send(msg)
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
          // sgMail.send(msg)
        }
        res.status(201).send(result)
      })
      .catch(err => {
        throw Error(err)
      })
  } catch (error) {
    res.sendStatus(500)
  }
}

// Edit order
async function editOrder (req, res) { //
  // try {
  //   // console.log('Edit Order request')
  //   // console.log('req.params.id', req.params.id)
  //   await
  //   Order.findById(req.params.id).then(order => {
  //     order.update({
  //       cityID: req.body.cityID,
  //       masterID: req.body.masterID,
  //       clientID: req.body.clientID,
  //       date: req.body.date,
  //       time: req.body.time,
  //       duration: req.body.duration
  //     })
  //       .then(result => {
  //         // console.log('result', result.get({
  //         //   plain: true
  //         // }))
  //         res.status(201).send(result)
  //       })
  //   })
  //     .catch(error => {
  //       // if some errors - throw them to further handle
  //       throw Error(error)
  //     })
  // // errors hendling send status 500
  // } catch (error) {
  //   res.sendStatus(500)
  // }
  res.sendStatus(500)
}

// Delete order
async function deleteOrder (req, res) {
  try {
    await
    Order.destroy({
      where: {
        ID: req.params.id
      }
    }).then(result => {
      return res.sendStatus(204)
    })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (error) {
    res.sendStatus(500)
  }
}
