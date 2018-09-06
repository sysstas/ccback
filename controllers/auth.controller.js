var express = require('express')
var router = express.Router()
//var connection = require('./connection')
var Admin = require('../models/Admin')
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
	let { login, password } = req.body
  try {
		let payload = {};
		let result = {};
    await 
    User.findOne({ where: {userEmail: login} }).then( user => {          
			result = user
		})
		
		bcrypt.compare(password,  result.dataValues.password, await function(err, data) {
			console.log('User authorised? ', data)
			if (result && data) {		
				console.log('Sending JWT')			
				payload.isAdmin = result.dataValues.isAdmin
				payload.isRegistered = result.dataValues.isRegistered
				payload.regToken = result.dataValues.regToken
				payload.ID = result.dataValues.id
				// console.log('result is ', result.dataValues)
				let token = jwt.sign(payload, 'secret')

				res.status(200).send( {token: token})				
			} else
			res.status(401)



		})
						// console.log('password: ', result.dataValues.password)		



  } catch (error) {
    console.log('access denied')  
    console.log(error)   
    res.sendStatus(500) 
  }
    
	// if (login === 'admin@example.com' && password === 'passwordsecret') {
	// 	console.log('access granted')     
	// 	res.sendStatus(200)
	// } else {
	// 	console.log('access denied')  
	// 	res.sendStatus(401)
	// }
	// let admin = await Admin.findOne({login: login, password: password})	
	// if ( admin){ 
	// 	console.log('access granted')     
	// 	res.sendStatus(200)
	// } else {
	// 	console.log('access denied')  
	// 	res.sendStatus(401)
	// }
} 