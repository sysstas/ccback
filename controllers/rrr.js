const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')
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
Master.findAll({
  where: {
    cityId: this.cityId,
    id: {
      $notIn: sequelize.literal('')
    }
}})

Orders.find