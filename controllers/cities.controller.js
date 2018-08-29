var express = require('express')
var router = express.Router()

var checkAuthenticated = require('./checkAuth.controller')
var City = require('../models/City')



router.get('/', getAllCities);
router.post('/', checkAuthenticated, createNewCity);
router.put('/:id', checkAuthenticated, editCity);
router.delete('/:id', checkAuthenticated, deleteCity);

module.exports = router;




//Functions
// Get all cities request hendling
async function getAllCities(req, res) {
	try {
     await 
      City.findAll().then(cities => {
        // console.log(cities)
        res.status(200).send(cities) 
      })           
	} catch (error) {
		console.log('error')    
		res.sendStatus(500) 
	}  
}

//Create new city request hendling
async function createNewCity(req, res){    
  try {     
    console.log('city creation request')
      City.build({ cityName: req.body.cityName })
      .save()
      .then( result => {
        // if successfully saved send status 201
        res.status(201).send(result)
      })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  } catch (err) {
    console.log('err')    
    res.sendStatus(500) 
  }  
}

//Edit city request hendling
async function editCity(req, res){   
  try {     
    console.log('Edit City request')
    console.log('req.params.id: ', req.params.id)
    console.log('req.body.cityName: ', req.body.cityName)
      City.findById(req.params.id).then( city => {
        city.update({
          cityName: req.body.cityName
        }).then( result => {
            // if successfully saved send status 200
        
          res.status(200).send(result);
        })
      })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })     
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Delete city request hendling
async function deleteCity(req, res){ 
  try {     
    console.log('Delete City request')    
      City.destroy({
        where: {
          ID: req.params.id
        }
      }).then( result => {
        // if successfully deleted send status 204
        if(result) {
          console.log('deleted: ', result)
          res.sendStatus(204);
        }
      })        
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })      
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}
