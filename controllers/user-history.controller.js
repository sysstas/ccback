const express = require('express')
const router = express.Router()

const userauth = require('./checkUserAuth.controller')
const auth = require('./checkAuth.controller')
const validateToken = auth.validateToken

// const checkUserRegistered = userauth.checkUserAuthenticated
const tokenDecoding = auth.tokenDecoding
const logger = require('./logger.service')

const Master = require('../models/Master')
const City = require('../models/City')
const Order = require('../models/Order')
const User = require('../models/User')

router.get('/', userOrderHistoryData)
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userOrderHistoryData (req, res) {
  const tokenPayload = await validateToken(req, res)
  logger.info(`User email:  ${tokenPayload.email}`)
  let user
  try {
    const data = await User.findOne({ where: { userEmail: tokenPayload.email } }, { attributes: ['id', 'isAdmin', 'isRegistered', 'regToken', 'userEmail', 'userName', 'password'] })
    if (data) {
      logger.info(`User data retrieved from api db:  ${data}`)
      user = data.get({ plain: true })
      logger.info(`User data:  ${user}`)
      console.log(user)
    }
    const orders = await Order.findAll({ include: [City, Master, User], where: { userID: user.id } })
    if (orders) {
      logger.info(`Orders data retrieved from api db:  ${data}`)
      return res.status(200).send(orders)
    }
    throw Error('Something miss in DB')
  } catch (error) {
    logger.error(`Data retrieving error:  ${error}`)
    res.sendStatus(500)
  }
}
