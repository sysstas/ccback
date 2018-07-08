var express = require('express')
var router = express.Router()
//var connection = require('./connection')
var Admin = require('../models/Admin')

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
  let { login, password } = req.body	
  try {
    await 
    Admin.findOne({ where: {login: login, password: password} }).then( result => {
      console.log('access granted')     
      res.sendStatus(200)
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