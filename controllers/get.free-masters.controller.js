var express = require('express')
var router = express.Router()
var Master = require('../models/Master')
var mysql = require('mysql');
var db_config = {
	host     : 'ccdb.cyvbhrm19emn.eu-west-1.rds.amazonaws.com',
	port : '3306',
	user     : 'ccadmin',
	password : 'chdelsss',
	database: 'ccdb'
  };

  var connection;

  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

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