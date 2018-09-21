var express = require('express')
var router = express.Router()
var userauth = require('./checkUserAuth.controller')
var auth = require('./checkAuth.controller')
var checkUserRegistered = userauth.checkUserAuthenticated
var tokenDecoding = auth.tokenDecoding
var User = require('../models/User')



router.get('/', checkUserRegistered, userAccountData)
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userAccountData (req, res) {
  try {
    var token = req.header('authorization').split(' ')[1]
    let payload = tokenDecoding(token)
    const data = await User.findById(payload.ID)

    return res.status(200).send(data)     
  } catch (error) {
    res.sendStatus(500)
  }
}

