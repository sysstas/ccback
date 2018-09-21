const express = require('express')
const router = express.Router()
const connection = require('./connection')
// var Master = require('../models/Master')

router.post('/', getMastersSchedule)

module.exports = router

// Function
async function getMastersSchedule (req, res) {
  console.log('schedule', req.body)
  const sql = `
  SELECT 
    orders.ID,
    masters.masterName, 
    orders.time,
    orders.duration
  FROM orders
  LEFT JOIN cities 
    ON orders.cityID = cities.ID
  LEFT JOIN masters
    ON orders.masterID = masters.ID
  LEFT JOIN clients
    ON orders.clientID = clients.ID
  WHERE orders.cityID = ${req.body.cityID} AND orders.date = ${req.body.date}
`
  try {
    await
    connection.query(sql, (er, response) => {
      if (!er) { console.log('Schedule data: ', response) }
      res.status(200).send(response)
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
