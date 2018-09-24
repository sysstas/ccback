const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.get('/:id', getInitialUserData)
router.post('/', registerUser)

module.exports = router

// Functions
// Get  initial user data end chek if user not registered yet
async function getInitialUserData (req, res) {
  try {
    const result = await User.findOne({ where: { regToken: req.params.id } })
    const user = result.get({ plain: true })
    // Checking if user not registerd
    if (!user.isRegistered) {
      // creating object containing necessary information for api
      const initialUserData = {
        userName: user.userName,
        userEmail: user.userEmail,
        isRegistered: user.isRegistered
      }
      res.status(200).send(initialUserData)
      // If user already registered send only information that user is registered
    } else {
      const initialUserData = {
        isRegistered: user.isRegistered
      }
      res.status(200).send(initialUserData)
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

async function registerUser (req, res) {
  try {
    const userEmail = req.body.email
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.findOne({ where: { userEmail: userEmail } })
    const result = await user.update({ isRegistered: 1, password: encryptedPassword })
    // if successfully saved send status 200
    res.status(200).send(result.get({ plain: true }))
  } catch (error) {
    res.sendStatus(500)
  }
}
