var express = require('express')
var router = express.Router()
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

router.post('/', auth)

module.exports = router

/// Function
async function auth (req, res) {
  let { login, password } = req.body
  try {
    let payload = {}
    let result = {}
    await
    User.findOne({ where: { userEmail: login } }).then(user => {
      result = user
    })

    bcrypt.compare(password, result.dataValues.password, await function (err, data) {
      if (err) {
        throw Error(err)
      }
      if (result && data) {
        payload.isAdmin = result.dataValues.isAdmin
        payload.isRegistered = result.dataValues.isRegistered
        payload.regToken = result.dataValues.regToken
        payload.ID = result.dataValues.id
        let token = jwt.sign(payload, 'secret')
        res.status(200).send({ token: token })
      } else { res.status(401) }
    })
  } catch (error) {
    res.sendStatus(500)
  }
}
