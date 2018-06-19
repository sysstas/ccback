var express = require('express')
var router = express.Router()
var connection = require('./connection')


router.post('/', getCurrentClient);

module.exports = router;

// Function


async function getCurrentClient(req, res) {
	console.log('getCurrentClient', req.body) 
  let sql =`
  SELECT  c.ID
  FROM clients c
  WHERE c.clientEmail = '${req.body.clientEmail}'
  ` 
  // console.log(sql)
	try {
     await connection.query(sql, function(er, response){
        if (!er) 
        res.status(200).send(response)        
      });	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}
