const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')


const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

const logger = require('../services/logger.service')

router.post('/', test)

module.exports = router

async function test (req, res) {
  try {
    const cityId = req.body.cityId
    const data = req.body.date
    const Op = Sequelize.Op
    const freeMasters = await Order.findAll({
              // Choosing only safe fields from Order
              // attributes: ['master'],
              where: {
                cityId: cityId
              },
              // Choosing only safe fields from assosiated tables
              include: [
                // { model: City, attributes: ['cityName'], paranoid: false },
                { model: Master, attributes: ['masterName']},
                // { model: User, attributes: ['userName', 'userEmail'], paranoid: false }
              ],
                attributes: ['masterId'],
              group: ['masterId']

    })
    res.status(200).send(freeMasters)
  } catch (error) {
    logger.error(`Test error ${error}`)
    res.sendStatus(500)
  }
}
const r =
  `  
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
  `
const x = `

  Executing (default): 
  SELECT 
    \`id\`, \`masterName\`, \`masterRating\`, \`cityId\` 
  FROM 
    \`masters\` 
  AS 
    \`master\` 
  WHERE 
      (
        ( 
          \`master\`.\`deletedAt\` > '2018-11-22 11:19:30' 
        OR 
          \`master\`.\`deletedAt\` IS NULL
        ) 
        AND 
        ( \`master\`.\`cityId\` = 1)
       );
`
