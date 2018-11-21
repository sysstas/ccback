const express = require('express')
const router = express.Router()
const sequelize = require('../helpers/connection.helper')
const logger = require('../services/logger.service')

router.post('/', getFreeMasters)

module.exports = router

// Function
async function getFreeMasters (req, res) {
  console.log(req.body)
  const cityID = req.body.cityID
  const date = req.body.date
  const time = req.body.time
  const duration = req.body.duration
  try {
    await
    sequelize.query(`  
    SELECT  m.ID, m.masterName, m.masterRating 
    FROM masters m
    WHERE m.cityID = :city AND (m.ID, m.masterName ) NOT IN (
      SELECT DISTINCT m.ID, m.masterName
      FROM masters m
      LEFT JOIN orders o ON o.masterID = m.ID 
      WHERE m.cityID = :city
      AND 
      (
        (o.date = :date)
        AND
       (
          ( :time BETWEEN o.time AND (o.time+o.duration-1) )
        OR 
          ( (:time+:duration-1) BETWEEN o.time AND (o.time+o.duration-1) )
        )
      )
    )
  `, { replacements: { city: cityID, date: date, time: time, duration: duration }, type: sequelize.QueryTypes.SELECT })
      .then(masters => {
        res.status(200).send(masters)
      })
  } catch (error) {
    logger.error(`Get free masters error ${error}`)
    res.sendStatus(500)
  }
}
