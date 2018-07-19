var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

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
    Client.findOrCreate ({ where: { 
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail
    } }).spread((client, created) => {
      res.status(201).send(client.get({
        plain: true
      }))
      console.log(client.get({
        plain: true
      }))
      console.log(created)
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
    //Checking is user Admin
    AuthCheck( req.body.token)
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
    //Checking is user Admin
    AuthCheck( req.body.token)
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

function AuthCheck(token){
  let payload = {}
  jwt.verify(token,'secret',(err, decoded) => {
    console.log('decoded on city: ', decoded)
    payload.login = decoded.login
    payload.password = decoded.password
  })
  // If there no such Admin in DB - node will throw an error
  Admin.findOne({ where: {login: payload.login, password: payload.password} })
  .then( result => {
    console.log('login: ', result.dataValues.login)
    console.log('password: ', result.dataValues.password) 
  })
}