var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
	let login = req.body.login
	let password = req.body.password
	let admin = await Admin.findOne({login: login})	
	let patternLogin = admin.login
	let patternPassword = admin.password

	if ( login == patternLogin && password == patternPassword){ 
		console.log('access granted')     
		res.sendStatus(200)
	} else {
		console.log('access denied')  
		res.sendStatus(401)
	}
}