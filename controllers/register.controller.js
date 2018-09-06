var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')

// var checkAuthenticated = require('./checkAuth.controller')
var User = require('../models/User')



router.get('/:id', getInitialUserData);
router.post('/', registerUser);
// router.put('/:id', checkAuthenticated, editCity);
// router.delete('/:id', checkAuthenticated, deleteCity);

module.exports = router;

//Functions
// Get  initial user data end chek if user not registered yet
async function getInitialUserData(req, res) {
	try {
    console.log('register req', req.params.id)
    await
    User.findOne({ where: {regToken: req.params.id} }).then( result => {
      // console.log("Getting user for registration ", result.get({ plain: true }))
      let user = result.get({ plain: true })
      //Checking if user not registerd
      if (!user.isRegistered) {
        //creating object containing necessary information for api
        let initialUserData = {
          userName: user.userName,
          userEmail: user.userEmail,
          isRegistered: user.isRegistered
        }
      return res.status(200).send(initialUserData)  
      //If user already registered send only information that user is registered
      } else {
        let initialUserData = {
          isRegistered: user.isRegistered
        }
      return res.status(200).send(initialUserData)  
      }
    })      
	} catch (error) {
		console.log('error', error)    
		res.sendStatus(500) 
	}  
}

async function registerUser(req,res){
  try {
    console.log('register req', req.body)
    let userEmail = req.body.email
    let encryptedPassword
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
      console.log("hash ", hash)
      encryptedPassword = hash
    })
    await
    User.findOne({ where: {userEmail: userEmail} }).then( user => {
      console.log(user.get({ plain: true }))
      user.update({
        isRegistered: 1,
        password: encryptedPassword
      }).then( result => {
        // if successfully saved send status 200    
      res.status(200).send(result.get({ plain: true }));
      })
    }).catch(error => {
      // if some errors - throw them to further handle
      throw error
    }) 
  } catch (error) {
    console.log(error)
  }
}