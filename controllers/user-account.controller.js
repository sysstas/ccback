const express = require('express')
const router = express.Router()
const auth = require('../services/checkAuth.service')
const validateToken = auth.validateToken
const User = require('../models/user')
const logger = require('../services/logger.service')

router.get('/', userAccountData)

module.exports = router

// Functions
/// Get  user account data
async function userAccountData (req, res) {
  const tokenPayload = await validateToken(req, res)
  logger.info(`User email:  ${tokenPayload.email}`)
  try {
    const data = await User.findOne({ where: { userEmail: tokenPayload.email } }, { attributes: ['id', 'isAdmin', 'userEmail', 'userName'] })
    if (data) {
      logger.info(`User data retrieved from api db:  ${data}`)
      return res.status(200).send(data)
    }
    throw Error('No such user in local db')
  } catch (error) {
    logger.error(`User data retrieving error:  ${error}`)
    res.sendStatus(404)
  }
}
