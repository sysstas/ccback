var express = require('express')
var router = express.Router()
var Client = require('../models/Client')

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

router.get('/', getAllClients);
router.post('/', createNewClient);
router.put('/:id', editClient);
router.delete('/:id', deleteClient);

module.exports = router;

// Functions

async function getAllClients(req, res) {
	try {
		await connection.query("SELECT * FROM clients", function(er, response){
      if (!er) 
      res.status(200).send(response)        
    });	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}  
}


// async function getAllClients(req, res) {
// 	try {
// 		let clients = await Client.find({}, '-__v') 
// 		res.send(clients)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}  
// }

async function createNewClient(req, res) {
  let newMaster = req.body
	console.log('request: ', newMaster)
   let sql = `INSERT INTO clients (clientName, clientEmail) 
   VALUES('${req.body.clientName}','${req.body.clientEmail}')
   `
  console.log('sql: ', sql)
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

// async function createNewClient(req, res) {
// 	let client = req.body
// 	let { name, email } = req.body	
// 	let exist = await Client.find({ email: email})
// 	if (exist.length > 0){
// 		console.log("exist") 
// 	} else {
// 		let newClient = new Client(client)
// 		await newClient.save((err, result) => {
// 			if(err)
// 			console.log('saving client error')
// 			res.status(201).send({id: result._id, name: result.name, email: result.email}) 
// 			console.log(result)
// 		})
// 	}
// }

async function editClient(req, res) {
  console.log('request: ', req.body) 
  let sql =`UPDATE clients 
  SET clientName = '${req.body.clientName}',
  clientEmail = '${req.body.clientEmail}'
  WHERE ID = ${req.params.id}
  ` 
  console.log('sql: ', sql)
  console.log('ID: ', req.params.id)
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

// async function editClient(req, res) {
// 	await Client.findByIdAndUpdate(req.params.id,
// 		req.body,
// 		{new: true},      
// 		(err, result) => {
// 			if(err) {
// 					console.log(err)
// 					return res.status(500).send(err)
// 			}
// 			console.log(result)
// 			res.status(200).send({id: result._id, name: result.name, email: result.email})
// 		}
// 	)
// }

async function deleteClient(req, res) {
  console.log('ID: ', req.params.id)
  let sql = "DELETE FROM clients WHERE ID = '"+req.params.id+"'" 
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

// async function deleteClient(req, res) {
// 	await Client.findByIdAndRemove( req.params.id, (err, result) => {  
// 		if (err) {
// 			console.log(err)
// 			return res.status(500).send(err);
// 		}
// 		const response = {
// 			message: "Client successfully deleted"
// 		}
// 		console.log("Client deleted")
// 		return res.status(204).send(response);  
// 	});
// }
