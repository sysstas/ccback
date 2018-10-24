const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const logger = require('./logger.service')

// const crypto = require('crypto')

router.post('/', auth)
router.post('/auth0hook', auth0WEBHook)

module.exports = router

let userData, isCreated, user
user = null
isCreated = null
const payload = {}
async function auth (req, res) {
  const { login, password, googleToken } = req.body
  try {
    console.log('******SERVER received req.body', req.body)
    // If user logiggn in with Google login
    if (googleToken !== null) {
      // Verifying Google token
      await verifyGoogleToken(googleToken)
      // Checking if user exist. If not - creating one
      await checkUserOrCreateNew(userData)
    }
    if (googleToken === null) {
      console.log('--------------------googleToken = 0 ')
      isCreated = null
      user = null
    }
    // If user logged in by Google is new we must to add additional information to his account
    if (isCreated === true && isCreated !== null) {
      const newuser = await User.findById(user.id)
      const result = await newuser.update({ regToken: 'Registered by Google', isAdmin: 0, isRegistered: 1, userName: userData.userName })
      // console.log(result.get({ plain: true }))
      // console.log('User is  created')
      payload.isAdmin = result.dataValues.isAdmin
      payload.isRegistered = result.dataValues.isRegistered
      payload.regToken = result.dataValues.regToken
      payload.ID = result.dataValues.id
      const token = jwt.sign(payload, 'secret')
      // console.log('Google token', token)
      res.status(200).send({ token: token })
    }
    if (isCreated === false && isCreated !== null) {
      console.log('--isCreated', isCreated)
      console.log('--user', user)
      payload.isAdmin = user.isAdmin
      payload.isRegistered = user.isRegistered
      payload.regToken = user.regToken
      payload.ID = user.id
      const token = jwt.sign(payload, 'secret')
      console.log('--------------------User is not created', payload)
      // console.log('Google token', token)
      res.status(200).send({ token: token })
    }
    // If user was logged in by login-password form
    const result = await User.findOne({ where: { userEmail: login } })
    const data = await bcrypt.compare(password, result.dataValues.password)
    if (result && data) {
      payload.isAdmin = result.dataValues.isAdmin
      payload.isRegistered = result.dataValues.isRegistered
      payload.regToken = result.dataValues.regToken
      payload.ID = result.dataValues.id
      console.log('--------------------SERVER classic login', payload)
      const token = jwt.sign(payload, 'secret')
      res.status(200).send({ token: token })
    } else {
      console.log(result)
      res.sendStatus(401)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

/// verifyGoogleToken
async function verifyGoogleToken (token) {
  console.log('verifyGoogleToken runs')
  const client = new OAuth2Client('902455189500-mpc1v2qsioej6o17e2no0rc122vh40bh.apps.googleusercontent.com')
  async function verify () {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '902455189500-mpc1v2qsioej6o17e2no0rc122vh40bh.apps.googleusercontent.com'
    })
    const payload = ticket.getPayload()
    const userDataReceived = { userName: payload.name, userEmail: payload.email }
    // console.log('SERVFERXGoogle', userDataReceived)
    userData = userDataReceived
  }
  await verify().catch(console.error)
}

async function checkUserOrCreateNew (userData) {
  console.log('checkUserOrCreateNew runs')
  await User.findOrCreate({ where: {
    userEmail: userData.userEmail
  } }).spread((userinfo, created) => {
    // saving isCreated status to variable
    isCreated = created
    user = userinfo.get({ plain: true })
  })
  // console.log('asdfasdfasdf', isCreated, user)
}

async function auth0WEBHook (req, res) {
  console.log('Web hook fires', req.body)
  logger.info(`Node app is running on port ${req.body}`)
  res.status(200).send({ 'isAdmin': { 'isAdmin': 1 } })
}
