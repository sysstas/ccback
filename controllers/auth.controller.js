var express = require('express')
var router = express.Router()
//var connection = require('./connection')
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
  let { login, password } = req.body	
  try {
    await 
    Admin.findOne({ where: {login: login, password: password} }).then( result => {
			let payload = {}
			console.log('login: ', result.dataValues.login)
			console.log('password: ', result.dataValues.password) 			
			console.log('access granted') 
			payload.login = result.dataValues.login
			payload.password = result.dataValues.password
			let token = jwt.sign(payload, 'secret')
 
			console.log('token: ', token)  
			jwt.verify(token,'secret',(err, decoded) => {
				console.log('decoded: ', decoded)
			})
			// bcrypt.hash('password', 10, (err, hash) =>{
			// 	console.log('hash: ', hash);
			// })  
      res.status(200).send({token})
    })
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