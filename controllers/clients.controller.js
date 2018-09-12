var express = require('express')
var crypto = require('crypto')    
var router = express.Router()
// var Admin = require('../models/Admin')
// var jwt = require('jsonwebtoken')


var User = require('../models/User')
var auth = require('./checkAuth.controller')
var checkAuthenticated = auth.checkAuthenticated

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
  // creating helper variables
  let isCreated, user
  let userMail =  req.body.userEmail
  console.log('userMail', userMail)
  // generating registrarion hash
  let hash = crypto.createHash('md5').update(userMail).digest("hex");
  // serching for user, if not exist - creating one
  try {
    await    
    User.findOrCreate ({ where: { 
      userName: req.body.userName,
      userEmail: req.body.userEmail
    } }).spread((userinfo, created) => {     
      //saving isCreated status to variable
        isCreated = created 
        user = userinfo.get({plain: true})
        // console.log("USER INFO ", user)
    }) 
    //checking if user newly created - we add more information in profile
    if (isCreated) {
      // Add basic user information to user account
      console.log("Trying to add some information to new user ")
      await
      User.findById(user.id).then( newuser => {
        newuser.update({ regToken: hash, isAdmin:0, isRegistered:0})
        .then( result => {
          let newUser = result.get({ plain: true })
          console.log("Creation newly created user result ", newUser)
          //creating object containing necessary information for api
          let resData = {
            isAdmin: newUser.isAdmin,
            isRegistered: newUser.isRegistered,
            id: newUser.id,
            regToken: newUser.regToken
          }
          return res.status(200).send(resData)
        })
      })
    // If user already exist we pass expected data to response
    } else {
      console.log("USER EXIST", user)
      let resData = {
        isAdmin: user.isAdmin,
        isRegistered: user.isRegistered,
        id: user.id,
        regToken:  user.regToken
      }
      console.log("user data: ", resData)
      return res.status(201).send(resData)
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
