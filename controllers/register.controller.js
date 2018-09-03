var express = require('express')
var router = express.Router()

// var checkAuthenticated = require('./checkAuth.controller')
var User = require('../models/User')



router.get('/:id', getInitialUserData);
// router.post('/', checkAuthenticated, createNewCity);
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
          userEmail: user.userEmail
        }
      return res.status(200).send(initialUserData)  
      //If user already registered send 401 - access denied
      } else {
        res.status(401)
      }
    })      
	} catch (error) {
		console.log('error', error)    
		res.sendStatus(500) 
	}  
}