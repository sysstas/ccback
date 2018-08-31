var express = require('express')
var crypto = require('crypto')    
var router = express.Router()
// var Admin = require('../models/Admin')
// var jwt = require('jsonwebtoken')

var Client = require('../models/Client')
var User = require('../models/User')
var checkAuthenticated = require('./checkAuth.controller')

router.get('/', checkAuthenticated, getAllClients);
router.post('/', createNewClient);
router.put('/:id', checkAuthenticated, editClient);
router.delete('/:id', checkAuthenticated, deleteClient);

module.exports = router;

// Functions
// Get all users
async function getAllClients(req, res) {
	try {
     await 
     User.findAll().then(users => {
       console.log("Users send to frontend")
        res.status(200).send(users) 
      })           
	} catch (error) {
    console.log("error while retreiveng users")
		//console.log(error)    
		res.sendStatus(500) 
	}  
}

//Create new client
async function createNewClient(req, res){
  console.log('user creation request', req.body)
  //generating registrarion hash
  let hash = crypto.createHmac('sha256', req.body.userEmail).digest('hex')
  // creating helper variables
  let isCreated, user
  try {
    await    
    User.findOrCreate ({ where: { 
      userName: req.body.userName,
      userEmail: req.body.userEmail
    } }).spread((userinfo, created) => {     
      //saving isCreated status to variable
        isCreated = created 
        user = userinfo.get({plain: true})
    }) 
    //checking if user newly created and add more information in profile
    if (isCreated) {
      // Add basic user information to user account
      console.log("Trying to add some information to new user ")
      await
      User.findOne({ where: {userEmail: req.body.userEmail} }).then( newuser => {
        newuser.update({ regToken: hash, isAdmin:0, isRegistered:0})
        .then( result => {
          console.log("Creation newly created user result ",result)
          
          return res.status(201).send(result.get({ plain: true }))
        })
      })
    } else {
          return res.status(200).send({user})
    }
  } catch (error) {
    //console.log(error)    
    console.log("error creating client", error)
    res.sendStatus(500) 
  }  
}

//Edit client
async function editClient(req, res){   
  try {     
    console.log('Edit Client request', req.body)
      User.findById(req.params.id).then( user => {
        user.update({ 
          userName: req.body.userName,
          userEmail: req.body.userEmail
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
    console.log('User delete request', req.params)    
      User.destroy({
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
