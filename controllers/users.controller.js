const express = require('express')
const crypto = require('crypto')
const router = express.Router()
// var Admin = require('../models/Admin')
// var jwt = require('jsonwebtoken')

const User = require('../models/User')
const auth = require('./checkAuth.controller')
const checkAuthenticated = auth.checkAuthenticated

router.get('/', checkAuthenticated, getAllClients)
router.post('/', createNewClient)
router.put('/:id', checkAuthenticated, editClient)
router.delete('/:id', checkAuthenticated, deleteClient)

module.exports = router

// Functions
// Get all users
async function getAllClients (req, res) {
  try {
    const user = await User.findAll()
    res.status(200).send(user)
  } catch (error) {
    res.sendStatus(500)
  }
}

// Create new client
async function createNewClient (req, res) {
  // creating helper variables
  let isCreated, user
  const userMail = req.body.userEmail
  // generating registrarion hash
  const hash = crypto.createHash('md5').update(userMail).digest('hex')
  // serching for user, if not exist - creating one
  try {
    await User.findOrCreate({
      where: {
        userEmail: req.body.userEmail
      },
      attributes: ['id', 'isAdmin', 'isRegistered', 'regToken'] }).spread((userinfo, created) => {
      // saving isCreated status to variable
      isCreated = created
      user = userinfo.get({ plain: true })
    })
    // checking if user newly created - we add more information in profile
    if (isCreated) {
      // Add basic user information to user account
      const newuser = await User.findById(user.id, { attributes: ['id', 'isAdmin', 'isRegistered', 'regToken'] })
      const result = await newuser.update({ regToken: hash, isAdmin: 0, isRegistered: 0, userName: req.body.userName })
      const newUser = result.get({ plain: true })
      res.status(201).send(newUser)
    // If user already exist we pass expected data to response
    } else {
      res.status(201).send(user)
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

// Edit client
async function editClient (req, res) {
  try {
    const user = await User.findById(req.params.id)
    const result = await user.update({ userName: req.body.userName, userEmail: req.body.userEmail })
    res.status(200).send(result)
  // errors hendling send status 500
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete client
async function deleteClient (req, res) {
  try {
    await User.destroy({ where: { ID: req.params.id } })
    // if successfully deleted send status 204
    res.sendStatus(204)
  // errors hendling send status 500
  } catch (err) {
    res.sendStatus(500)
  }
}
