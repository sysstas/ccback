var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
// var bcrypt = require('bcrypt')

var checkUserRegistered = require('./checkUserAuth.controller')
var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var User = require('../models/User')

Order.belongsTo(City, {foreignKey: 'cityId'})
Order.belongsTo(Master, {foreignKey: 'masterId'})
Order.belongsTo(User, {foreignKey: 'userID'})

router.get('/', checkUserRegistered, userOrderHistoryData);
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router;

//Functions
///Get  user account data
async function userOrderHistoryData(req, res) {
	try {
    var token =  req.header('authorization').split(' ')[1]
    let payload = tokenDecoding(token);
    // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', payload)
    // console.log('userOrderHistoryData requst header', ( req.header('Authorization') ) )
    await
    Order.findAll({ include: [City, Master, User], where: {userID: payload.ID} })
    .then( result => {      

      console.log("result OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", result)
      // return res.status(200)
      return res.status(200).send(result)
    })      
	} catch (error) {
		console.log('error', error)    
		res.sendStatus(500) 
	}  
}


///helper functions

  // Token decoding function
  function tokenDecoding(token) {
    console.log('start decoding')
    // console.log('start decoding token: ', token)  
    let payload = {}
    try {
      jwt.verify(token,'secret',(err, decoded) => {    
        console.log('decoded token: ', decoded)
        payload = decoded
        // payload.login = decoded.login
        // payload.password = decoded.password    
      })
    } catch (error) {
      return false
    } 
    console.log('token succesfully decoded ')
    return payload;
  }