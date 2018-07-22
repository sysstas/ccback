var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var Client = require('../models/Client')

Order.belongsTo(City, {foreignKey: 'cityId'})
Order.belongsTo(Master, {foreignKey: 'masterId'})
Order.belongsTo(Client, {foreignKey: 'clientId'})

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
  console.log('test')
  console.log(req.body)
  
  let { login, password } = req.body	
  let payload = {}
  payload.login = req.body.login
  payload.password = req.body.password
  console.log(payload)
  let token = jwt.sign(payload, 'secret')
 
			console.log('token: ', token)  
  
      res.status(200).send({token})
  
} 