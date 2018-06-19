var express = require('express')
var router = express.Router()
var connection = require('./connection')
//var Master = require('../models/Master')

router.post('/', getFreeMasters);

module.exports = router;

// Function


async function getFreeMasters(req, res) {
	console.log(req.body) 
  let sql =`
  SELECT  m.ID, m.masterName, m.masterRating 
  FROM masters m
  WHERE m.cityID = ${req.body.cityID} AND (m.ID, m.masterName ) NOT IN (
    SELECT DISTINCT m.ID, m.masterName
    FROM masters m
    LEFT JOIN orders o ON o.masterID = m.ID 
    WHERE m.cityID = ${req.body.cityID}
    AND 
    (
      (o.date = ${req.body.date})
      AND
      (
          ( ${req.body.time} BETWEEN o.time AND (o.time+o.duration-1) )
        OR 
          ( (${req.body.time}+${req.body.duration}-1) BETWEEN o.time AND (o.time+o.duration-1) )
      )
    )
  );
  ` 
  console.log(sql)
	try {
     await connection.query(sql, function(er, response){
        if (!er) 
        res.status(200).send(response)        
      });	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

// async function getFreeMasters(req, res) {
// 	try {
// 		let { city, date, time }  = req.body	
// 		let masters = await Master.find({
// 			$or:[
// 				/// element where master not work at all yet or not work in choosen day
// 				{
// 					city: city,
// 					busy: {
// 						$not:{
// 							$elemMatch: {
// 								date: date
// 							}
// 						}             
// 					}
// 				},
// 				/// elements where master works in choosen date, but is free in specific hours
// 				{
// 					city: city,
// 					busy: { 
// 						$elemMatch: {
// 							date: date,
// 							time: {$nin: time}
// 						}
// 					}
// 				}
// 			] 
// 		}, '-__v')
// 		res.send(masters)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}   
// }