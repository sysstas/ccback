var express = require('express')
var router = express.Router()

var userauth = require('./checkUserAuth.controller')
var auth = require('./checkAuth.controller')
var checkUserRegistered = userauth.checkUserAuthenticated
var tokenDecoding = auth.tokenDecoding

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var User = require('../models/User')



router.get('/', checkUserRegistered, userOrderHistoryData)
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userOrderHistoryData (req, res) {
  try {
    var token = req.header('authorization').split(' ')[1]
    let payload = tokenDecoding(token)
    const data = await Order.findAll({ include: [City, Master, User], where: { userID: payload.ID } })
    return res.status(200).send(data)
      
  } catch (error) {
    // console.log('error', error)
    res.sendStatus(500)
  }
}

