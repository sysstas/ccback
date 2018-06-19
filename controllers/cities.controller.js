var express = require('express')
var router = express.Router()
var connection = require('./connection')


//var City = require('../models/City')

router.get('/', getAllCities);
router.post('/', createNewCity);
router.put('/:id', editCity);
router.delete('/:id', deleteCity);

module.exports = router;

//Functions
async function getAllCities(req, res) {
	try {
     await connection.query("SELECT * FROM cities", function(er, response){
        if (!er) 
        res.status(200).send(response)        
      });	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

async function createNewCity(req, res){
  console.log('creation request')
  let sql = "INSERT INTO cities (cityName) VALUES('"+req.body.cityName+"')"
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        res.status(201).send(result)
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

async function editCity(req, res){
  let sql = "UPDATE cities SET cityName = '"+req.body.cityName+"' WHERE ID = '"+req.params.id+"'" 
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(200).send({result});
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

async function deleteCity(req, res){ 
  let sql = "DELETE FROM cities WHERE ID = '"+req.params.id+"'" 
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(204).send(result);
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}


  