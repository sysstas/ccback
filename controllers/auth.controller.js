const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/', auth)

module.exports = router

async function auth (req, res) {
  const { login, password } = req.body
  try {
    const payload = {}
    const result = await User.findOne({ where: { userEmail: login } })
    const data = await bcrypt.compare(password, result.dataValues.password)
    if (result && data) {
      payload.isAdmin = result.dataValues.isAdmin
      payload.isRegistered = result.dataValues.isRegistered
      payload.regToken = result.dataValues.regToken
      payload.ID = result.dataValues.id
      const token = jwt.sign(payload, 'secret')
      res.status(200).send({ token: token })
    } else { res.sendStatus(401) }
  } catch (error) {
    res.sendStatus(500)
  }
}
