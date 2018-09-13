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
  console.log('Searching free masters')
  console.log(req.body)

  let cityID = req.body.cityID
  let date = req.body.date
  let time = req.body.time
  let duration = req.body.duration

  try {
    await

    sequelize.query(`  
    SELECT  m.ID, m.masterName
    FROM masters m   
    
    LEFT JOIN orders o 
    ON m.ID = o.masterID
    WHERE 
    (
      -- select all masters who are "new" and did not get any orders yet and also belong to city we need    
      o.masterID is null 
      OR
      -- select masters who works on any day exept choosen
      o.date != :date
      OR 
      -- selecting all masters who definetly not busy on choosen time but  works on choosen date date
      (
        o.date = :date 
        AND 
        ( o.time not BETWEEN :time AND (:time+:duration-1) )
        AND
        (
          (o.time + o.duration -1) not BETWEEN :time AND (:time+:duration-1)
        )            
      )
    ) 
    AND m.cityID = :city
    GROUP BY m.ID
     ;`, { replacements: { city: cityID, date: date, time: time, duration: duration }, type: sequelize.QueryTypes.SELECT })
      .then(masters => {
        console.log(masters)
        res.status(200).send(masters)
      })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
