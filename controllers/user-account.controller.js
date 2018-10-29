const express = require('express')
const router = express.Router()
// const userauth = require('./checkUserAuth.controller')
const auth = require('./checkAuth.controller')
// const checkUserRegistered = userauth.checkUserAuthenticated
const validateToken = auth.validateToken
const User = require('../models/User')
const logger = require('../services/logger.service')

router.get('/', userAccountData)
// router.post('/', registerUser);
// router.put('/change-personal/:id', checkUserRegistered, changePersonal)
// router.put('/add/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userAccountData (req, res) {
  const tokenPayload = await validateToken(req, res)
  // console.log('1==1', tokenPayload.email)
  logger.info(`User email:  ${tokenPayload.email}`)
  try {
    const data = await User.findOne({ where: { userEmail: tokenPayload.email } }, { attributes: ['id', 'isAdmin', 'isRegistered', 'regToken', 'userEmail', 'userName', 'password'] })
    if (data) {
      logger.info(`User data retrieved from api db:  ${data}`)
      // console.log(data)
      return res.status(200).send(data)
    }
    throw Error('No such user in local db')
  } catch (error) {
    logger.error(`User data retrieving error:  ${error}`)
    res.sendStatus(404)
  }
}

// async function changePersonal (req, res) {
//   try {
//     console.log(req.body.tokenId)
//
//     res.status(200).send({ updated: 'success' })
//   } catch (error) {
//     console.log(error)
//   }
// }
