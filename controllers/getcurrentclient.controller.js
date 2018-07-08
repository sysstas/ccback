var express = require('express')
var router = express.Router()
// var connection = require('./connection')

var Client = require('../models/Client')

router.post('/', getCurrentClient);

module.exports = router;

// Function
async function getCurrentClient(req, res) {
	console.log('getCurrentClient', req.body) 
  
	try {
    await 
    Client.findOne({ where: {clientEmail: req.body.clientEmail} }).then(response => {
      res.status(200).send(response) 
    }) 
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}
