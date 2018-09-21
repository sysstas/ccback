const express = require('express')
const router = express.Router()
const userauth = require('./checkUserAuth.controller')
const auth = require('./checkAuth.controller')
const checkUserRegistered = userauth.checkUserAuthenticated
const tokenDecoding = auth.tokenDecoding
const User = require('../models/User')

router.get('/', checkUserRegistered, userAccountData)
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userAccountData (req, res) {
  try {
    const token = req.header('authorization').split(' ')[1]
    const payload = tokenDecoding(token)
    const data = await User.findById(payload.ID)

    return res.status(200).send(data)
  } catch (error) {
    res.sendStatus(500)
  }
}
