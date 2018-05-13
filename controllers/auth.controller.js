var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
	let { login, password } = req.body	
	let admin = await Admin.findOne({login: login, password: password})	
	if ( admin){ 
		console.log('access granted')     
		res.sendStatus(200)
	} else {
		console.log('access denied')  
		res.sendStatus(401)
	}
} 