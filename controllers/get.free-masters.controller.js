var express = require('express')
var router = express.Router()
//const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')
//var connection = require('./connection')
var Master = require('../models/Master')

router.post('/', getFreeMasters);

module.exports = router;

// Function
async function getFreeMasters(req, res) {
  console.log("Searching free masters")
  console.log(req.body) 

 
	try {
     await 
     sequelize.query(`  
     SELECT  m.ID, m.masterName
     FROM masters m   
     
     LEFT JOIN orders o 
     ON m.ID = o.masterID
       -- select all masters who are "new" and did not get any orders yet and also belong to city we need
     WHERE o.masterID is null 
       AND m.cityID = ${req.body.cityID}
       OR
     -- select masters who works on any day exept choosen
     o.date != ${req.body.date}
        OR 
       -- selecting all masters who definetly not busy on choosen time but  works on choosen date date
       (o.date = ${req.body.date} 
       AND 
         (o.time not BETWEEN ${req.body.time} AND (${req.body.time}+${req.body.duration}-1) )
               AND
               (
           (o.time + o.duration -1) not BETWEEN ${req.body.time} AND (${req.body.time}+${req.body.duration}-1)
               )            
     )		
   GROUP BY m.ID
     ;`, { type: sequelize.QueryTypes.SELECT})
     .then(masters => {
      console.log(masters)
       res.status(200).send(masters)  
     })	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}



// async function getFreeMasters(req, res) {
// 	console.log(req.body) 
//   let sql =`
//   SELECT  m.ID, m.masterName, m.masterRating 
//   FROM masters m
//   WHERE m.cityID = ${req.body.cityID} AND (m.ID, m.masterName ) NOT IN (
//     SELECT DISTINCT m.ID, m.masterName
//     FROM masters m
//     LEFT JOIN orders o ON o.masterID = m.ID 
//     WHERE m.cityID = ${req.body.cityID}
//     AND 
//     (
//       (o.date = ${req.body.date})
//       AND
//       (
//           ( ${req.body.time} BETWEEN o.time AND (o.time+o.duration-1) )
//         OR 
//           ( (${req.body.time}+${req.body.duration}-1) BETWEEN o.time AND (o.time+o.duration-1) )
//       )
//     )
//   );
//   ` 
//   console.log(sql)
// 	try {
//      await connection.query(sql, function(er, response){
//         if (!er) 
//         res.status(200).send(response)        
//       });	  
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500) 
// 	}  
// }

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