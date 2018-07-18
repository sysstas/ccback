var express = require('express')
var router = express.Router()

var Client = require('../models/Client')

router.get('/', getAllClients);
router.post('/', createNewClient);
router.put('/:id', editClient);
router.delete('/:id', deleteClient);

module.exports = router;

// Functions
// Get all clients
async function getAllClients(req, res) {
	try {
     await 
     Client.findAll().then(clients => {
       // console.log(clients)
       console.log("clients send to frontend")
        res.status(200).send(clients) 
      })           
	} catch (error) {
    console.log("error getting client")
		//console.log(error)    
		res.sendStatus(500) 
	}  
}

//Create new client
async function createNewClient(req, res){
  console.log('creation request')
  //console.log(req.body.clientName)
  try {
    await 
    Client.build({ 
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail
    })
      .save()
      .then( result => {
        // you can now access the currently saved task with the variable anotherTask... nice!
        res.status(201).send(result)
      })
      .catch(error => {
        // Ooops, do some error-handling
      })        
  } catch (error) {
    //console.log(error)    
    console.log("error creating client")
    res.sendStatus(500) 
  }  
}

//Edit client
async function editClient(req, res){//   
  console.log('Edit request')
  console.log(req.params.id)
  console.log(req.body.cityName)
  try {
    await 
    Client.findById(req.params.id).then( client => {
      client.update({ 
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail
      }).then( result => {
        return res.status(200).send(result);
      })
    })      	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Delete client
async function deleteClient(req, res){ 
  console.log('Delete request')
  console.log(req.params.id)
  try {
    await 
    Client.destroy({
      where: {
        ID: req.params.id
      }
    }).then( result => {
      console.log(result)
      return res.sendStatus(204);
    })
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}
