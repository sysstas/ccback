var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

var Client = require('../models/Client')

router.get('/', checkAuthenticated, getAllClients);
router.post('/', checkAuthenticated, createNewClient);
router.put('/:id', checkAuthenticated, editClient);
router.delete('/:id', checkAuthenticated, deleteClient);

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
async function editClient(req, res){   
  try {     
    console.log('Edit Client request')
      Client.findById(req.params.id).then( client => {
        client.update({ 
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail
        }).then( result => {
          return res.status(200).send(result);
        })
      })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }   
}

//Delete client
async function deleteClient(req, res){ 
  try {     
    console.log('Client delete request')    
      Client.destroy({
        where: {
          ID: req.params.id
        }
      }).then( result => {
        // if successfully deleted send status 204
        return res.sendStatus(204);
      })        
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })      
  // errors hendling send status 500
  } catch (err) {
    console.log(err)    
    res.sendStatus(500) 
  } 

  
    
}

////////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////
  
// Token decoding function
function tokenDecoding(token) {
  let payload = {}
  try {
    jwt.verify(token,'secret',(err, decoded) => {    
      console.log('decoded token: ', decoded)
      payload.login = decoded.login
      payload.password = decoded.password    
    })
  } catch (error) {
    return false
  } 
  console.log('payload: ', payload)
  return payload;
}

// Verifying Admin function
async function verifyAdmin(credentials){
  let isAdmin = await Admin.findOne({ where: {login: credentials.login, password: credentials.password} }).then( result => {
    // let payload = {}
    if (result === null) {
      console.log('access denied')
      return false
    } else {
      console.log('login: ', result.dataValues.login)
      console.log('password: ', result.dataValues.password) 
      return true		
    }
  })  
  return isAdmin;
}



///Auth function
async function checkAuthenticated(req, res, next){
 
  if (req.header('Authorization') === 'token null') {
    console.log('Authorization fails: missing auth header')
    return res.sendStatus(401).send('Unathorized. Missing auth header')
  }
  var token =  req.header('authorization').split(' ')[1]
  console.log('auth token: ', token)
  //sending token to decoder
  let adminCredentials = tokenDecoding(token);
  if (adminCredentials) {
    //if decoded correctly
    console.log('token decoded correctly')
    // verifying Admin credentials      
    if (await verifyAdmin(adminCredentials)) {
      // if Admin verified then next()
      console.log('Admin verified')
      next()
    } else {
      // if Admin not verified send status 401
      console.log('Admin not vryfied. Access denied')
      res.sendStatus(401)
    }
  } else {
    //if token is broken send status 400
    console.log('token cannot be decoded')
    res.sendStatus(400) 
  } 
}