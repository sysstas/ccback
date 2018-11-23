const express = require('express')
const router = express.Router()
const connection = require('../helpers/connection.helper')
const logger = require('../services/logger.service')
const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

router.post('/', getMastersSchedule)

module.exports = router

// Function
async function getMastersSchedule (req, res) {
  logger.info(`Schedule request cityId: ${req.body.cityId}; Date: ${req.body.date}`)

  try {
    // returning orders
    const schedule = await Order.findAll({
      where: { cityId: parseInt(req.body.cityId), date: parseInt(req.body.date)  },
      include: [
        { model: City, attributes: ['cityName'], paranoid: false },
        { model: Master, attributes: ['masterName'], paranoid: false },
        { model: User, attributes: ['userName', 'userEmail'], paranoid: false }
      ]
    })
    logger.info(`Schedule data: ${schedule}`)
    // console.log('sc', schedule)
    // returning masters
    const masters = await Master.findAll({ where: { cityId: req.body.cityId } })

    res.status(200).send({ schedule, masters })
  } catch (error) {
    logger.error(`Schedule request error: ${error}`)
    res.status(500).send(error)
  }
//   console.log('schedule', req.body)
//   const sql = `
//   SELECT
//     orders.ID,
//     masters.masterName,
//     orders.time,
//     orders.duration
//   FROM orders
//   LEFT JOIN cities
//     ON orders.cityID = cities.ID
//   LEFT JOIN masters
//     ON orders.masterID = masters.ID
//   LEFT JOIN clients
//     ON orders.clientID = clients.ID
//   WHERE orders.cityID = ${req.body.cityID} AND orders.date = ${req.body.date}
// `
//   try {
//     await
//     connection.query(sql, (er, response) => {
//       if (!er) { console.log('Schedule data: ', response) }
//       res.status(200).send(response)
//     })
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
}
