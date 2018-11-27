const express = require('express')
const router = express.Router()
const User = require('../models/user')
const logger = require('../services/logger.service')

router.post('/auth0hook', auth0WEBHook)

module.exports = router

async function auth0WEBHook (req, res) {

  try {
    logger.info(`Webhook fires`)
    console.log(req.body)
    let email
    if (req.body.user.email) {
      email = req.body.user.email
    }
    let isCreated, user
    await User.findOrCreate({
      where: { userEmail: email },
      attributes: ['id', 'isAdmin']
    })
      .spread((userinfo, created) => {
        isCreated = created
        user = userinfo.get({ plain: true })
      })

    logger.info(`New user:  ${!!isCreated}`)
    if (isCreated) {
      // console.log(req.body)
      const username = req.body.user.username || req.body.user.name
      logger.info(`name:  ${username}`)
      const thisUser = await User.findById(user.id)
      // console.log(thisUser)
      const updatedUser = await thisUser.update({ userName: username, isAdmin: 0 })
      if (updatedUser) {
        logger.info(`Updated user:  ${username}`)
        // console.log(updatedUser)
        console.log(` 'isAdmin': { 'isAdmin': 0 } `)
        return res.status(200).send({ 'isAdmin': { 'isAdmin': 0 } })
      }
    }
    if (user) {
      logger.info(`User data:  ${user}`)
      const admin = user.isAdmin
      // console.log(user)
      console.log(` 'isAdmin': { 'isAdmin': ${admin} } `)
      return res.status(200).send({ 'isAdmin': { 'isAdmin': admin } })
    }
    throw Error('No such user in db')
  } catch (error) {
    logger.error(`Data retrieving error:  ${error}`)
    console.log(` 'isAdmin': { 'isAdmin': 0 } `)
    return res.status(200).send({ 'isAdmin': { 'isAdmin': 0 } })
  }
}
