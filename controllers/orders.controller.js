var express = require('express')
var router = express.Router()
// var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var User = require('../models/User')
var Client = require('../models/Client')

var auth = require('./checkAuth.controller')
var checkAuthenticated = auth.checkAuthenticated
Order.belongsTo(City, {foreignKey: 'cityId'})
Order.belongsTo(Master, {foreignKey: 'masterId'})
Order.belongsTo(User, {foreignKey: 'userID'})


//sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', checkAuthenticated, getAllOrders)
router.post('/', createNewOrder);
router.put('/:id', checkAuthenticated, editOrder);
router.delete('/:id', checkAuthenticated, deleteOrder);

module.exports = router;

/// Functions
// Get all orders
async function getAllOrders(req, res) {
	try {
    await 
    Order.findAll({ include: [City, Master, User]}).then(result => {
      //console.log(result)
      console.log("Orders send to api")
      res.status(200).send(result) 
    })           
	} catch (error) {
    // console.log(error) 
    console.log("error getting order")   
		res.sendStatus(500) 
	}  
}

//Create new order
async function createNewOrder(req, res){
  // console.log('creation request')
  console.log("req.body ", req.body)
  try {
    await 
    Order.build({ 
      cityID: req.body.cityID,
      masterID: req.body.masterID,
      userID: req.body.user.id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration
    })
      .save()
      .then( result => {
        // sending email to user 
        console.log("order saved ", result.dataValues)
        // console.log('process.env', process.env);
        
        let masterName = req.body.masterName;
        let userEmail = req.body.userEmail;
        let userName = req.body.userName;
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateMsg = new Date(req.body.dateMsg).toLocaleDateString("en-US",options)
        let startTime = req.body.time;
        let duration = req.body.duration;
        let regToken = req.body.user.regToken;
        let msg
        //checking user registrarion
        console.log("User req.body.user  - ", req.body.user)
        if (!req.body.user.isRegistered) {
          console.log("User not registered  - ", req.body.user.isRegistered)
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
            `}
              
          // console.log("msg ", msg)
          sgMail.send(msg)

        } else {
          console.log("User registered  - ", req.body.user.isRegistered)
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
            `}              
          // console.log("msg ", msg)
          sgMail.send(msg)          
        }
        res.status(201).send(result)
      })
      .catch(error => {
        // Ooops, do some error-handling
      })        
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Edit order
async function editOrder(req, res){//   
  try {     
  console.log('Edit Order request')
  console.log("req.params.id", req.params.id)
      Order.findById(req.params.id).then( order => {
        order.update({ 
          cityID: req.body.cityID,
          masterID: req.body.masterID,
          clientID: req.body.clientID,
          date: req.body.date,
          time: req.body.time,
          duration: req.body.duration
        })
        .then( result => {
          console.log("result", result.get({
            plain: true
          }))
          res.status(201).send(result);
        })
      }) 
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })      
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  } 
}

//Delete order
async function deleteOrder(req, res){ 
  try {     
    console.log('Delete Order request') 
      Order.destroy({
        where: {
          ID: req.params.id
        }
      }).then( result => {
        console.log(result)
        return res.sendStatus(204);
      })        
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })      
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}
  

