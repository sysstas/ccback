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

router.post('/', getMastersSchedule);

module.exports = router;

// Function
async function getMastersSchedule(req, res) {
  console.log('schedule', req.body)
	let sql = `
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
		await connection.query(sql, function(er, response){
			if (!er) 
			console.log('Schedule data: ',response)
			res.status(200).send(response)        
		  });	  	
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}
}