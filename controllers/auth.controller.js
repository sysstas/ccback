var express = require('express')
var router = express.Router()

router.post('/', auth);

module.exports = router;

/// Function
async function auth(req, res){
	console.log('login request')
	let login = req.body.login
	let password = req.body.password
	let patternLogin =  'admin@example.com'
	let patternPassword = 'passwordsecret'
	if ( login == patternLogin && password == patternPassword){ 
		console.log('access granted')     
		res.sendStatus(200)
	} else {
		res.sendStatus(401)
	}
}