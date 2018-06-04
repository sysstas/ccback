var express = require('express')
var router = express.Router()
var Master = require('../models/Master')

var mysql = require('mysql');
var db_config = {
	host     : 'localhost',
	port : '3306',
	user     : 'root',
	password : '',
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

router.get('/', getAllMasters);
router.post('/', createNewMaster);
router.put('/:id', editMaster);
router.delete('/:id', deleteMaster);

module.exports = router;

// Functions
async function getAllMasters(req, res) {
	try {
    await connection.query(`SELECT MasterID, masterName, masterRating, cityName, CityID
    FROM masters 
    JOIN cities 
    ON masters.CityID = cities.ID
      `, function(er, response){
			if (!er) 
			res.status(200).send(response)        
		  });	
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}      
}

// async function getAllMasters(req, res) {
// 	try {
// 		let masters = await Master.find({}, '-__v')
// 		res.status(200).send(masters)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}      
// }

// async function createNewMaster(req, res) {
// 	let newMaster = req.body
// 	let master = new Master(newMaster)
// 	await master.save((err, result) => {
// 		if(err){
// 			console.log('saving master error')
// 			return res.status(500).send(err);
// 		}
// 		res.status(201).send({id: result._id, name: result.name, city: result.city, rating: result.rating})
// 		console.log(result)
// 	})  
// }

async function createNewMaster(req, res) {
	let newMaster = req.body
	console.log(newMaster)
   let sql = `INSERT INTO masters (masterName, CityID, masterRating) 
   VALUES('${req.body.masterName}',${req.body.CityID},${req.body.masterRating});
   `
   //console.log(sql)
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        res.status(201).send(result)
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

// async function editMaster(req, res) {  
// 	await Master.findByIdAndUpdate(
// 		req.params.id,
// 		req.body,
// 		{new: true},      
// 		(err, result) => {
// 			if(err) {
// 				console.log(err)
// 				return res.status(500).send(err)
// 			}
// 			console.log(result)
// 			res.status(200).send({id: result._id, name: result.name, city: result.city, rating: result.rating})
// 		}
// 	)
// }

async function editMaster(req, res) { 
  console.log(req.body) 
  let sql =`UPDATE masters 
  SET masterName = '${req.body.masterName}',
  CityID = (SELECT cities.ID FROM cities WHERE cities.cityName = '${req.body.cityName}'),
  masterRating = ${req.body.masterRating}
  WHERE MasterID = ${req.params.id}
  ` 
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(200).send({result});
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

// async function deleteMaster(req, res) {
// 	await Master.findByIdAndRemove( req.params.id, (err, result) => {  
// 		if (err) {
// 			console.log(err)
// 			return res.status(500).send(err);
// 		}
// 		const response = {
// 			message: "Master successfully deleted"
// 		}
// 		console.log("Master deleted")
// 		return res.status(204).send(response);  
// 	});
// }

async function deleteMaster(req, res) {
	let sql = "DELETE FROM masters WHERE MasterID = '"+req.params.id+"'" 
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(204).send(result);
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}