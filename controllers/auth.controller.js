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
    await 
    User.findOne({ where: {userEmail: login} }).then( result => {
      let payload = {}
      
      bcrypt.compare(password,  result.dataValues.password, function(err, res) {
        // res == true
        console.log('user authorised? ', res)
       })
      // bcrypt.hash(password, 10, (err, hash) =>{
      //   console.log("hash ", hash)
      //   encryptedPassword = hash
      // })
      
	    // console.log("encryptedPassword ", encryptedPassword)
			// console.log('login: ', result.dataValues)
			console.log('password: ', result.dataValues.password) 			
			// console.log('user authorised')
			if (result) {
				
				payload.isAdmin = result.dataValues.isAdmin
				let token = jwt.sign(payload, 'secret')
	
				console.log('token: ', {token: token, isAdmin: 1})  
				// jwt.verify(token,'secret',(err, decoded) => {
				// 	console.log('decoded: ', decoded)
				// })
  
				res.status(200).send( {token: token})				
			} else
			res.status(401)


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