var express = require('express')
var router = express.Router()
// const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')
// var connection = require('./connection')
// var Master = require('../models/Master')

router.post('/', getFreeMasters)

module.exports = router

// Function
async function getFreeMasters (req, res) {
  // console.log('Searching free masters')
  // console.log("SERVER",req.body)

  let cityID = req.body.cityID
  let date = req.body.date
  let time = req.body.time
  let duration = req.body.duration

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
  )`, { replacements: { city: cityID, date: date, time: time, duration: duration }, type: sequelize.QueryTypes.SELECT })
      .then(masters => {
        // console.log(masters)
        res.status(200).send(masters)
      })
  } catch (error) {
    // console.log(error)
    res.sendStatus(500)
  }
}
