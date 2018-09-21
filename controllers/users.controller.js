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
    await
    User.findAll().then(users => {
      res.status(200).send(users)
    })
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
    await
    User.findOrCreate({ where: {
      userName: req.body.userName,
      userEmail: req.body.userEmail
    } }).spread((userinfo, created) => {
      // saving isCreated status to variable
      isCreated = created
      user = userinfo.get({ plain: true })
    })
    // checking if user newly created - we add more information in profile
    if (isCreated) {
      // Add basic user information to user account
      await
      User.findById(user.id).then(newuser => {
        newuser.update({ regToken: hash, isAdmin: 0, isRegistered: 0 })
          .then(result => {
            const newUser = result.get({ plain: true })
            // creating object containing necessary information for api
            const resData = {
              isAdmin: newUser.isAdmin,
              isRegistered: newUser.isRegistered,
              id: newUser.id,
              regToken: newUser.regToken
            }
            return res.status(201).send(resData)
          })
      })
    // If user already exist we pass expected data to response
    } else {
      const resData = {
        isAdmin: user.isAdmin,
        isRegistered: user.isRegistered,
        id: user.id,
        regToken: user.regToken
      }
      return res.status(201).send(resData)
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

// Edit client
async function editClient (req, res) {
  try {
    await
    User.findById(req.params.id).then(user => {
      user.update({
        userName: req.body.userName,
        userEmail: req.body.userEmail
      }).then(result => {
        return res.status(200).send(result)
      })
    })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (error) {
    res.sendStatus(500)
  }
}

// Delete client
async function deleteClient (req, res) {
  try {
    // console.log('User delete request', req.params)
    await
    User.destroy({
      where: {
        ID: req.params.id
      }
    }).then(result => {
      // if successfully deleted send status 204
      return res.sendStatus(204)
    })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (err) {
    // console.log(err)
    res.sendStatus(500)
  }
}
