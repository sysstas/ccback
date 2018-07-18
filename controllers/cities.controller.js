var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

var City = require('../models/City')

router.get('/', getAllCities);
router.post('/', createNewCity);
router.put('/:id', editCity);
router.delete('/:id', deleteCity);

module.exports = router;

//Functions
// Get all cities
async function getAllCities(req, res) {
	try {
     await 
      City.findAll().then(cities => {
        console.log(cities)
        res.status(200).send(cities) 
      })           
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

//Create new city
async function createNewCity(req, res){
  console.log('creation request')
  //console.log(req.body.cityName)
  let payload = {}
  try {
    await 


      jwt.verify(req.body.token,'secret',(err, decoded) => {
        if (err)  res.sendStatus(500) 
        console.log('decoded on city: ', decoded)
        payload.login = decoded.login
			  payload.password = decoded.password
			})
    Admin.findOne({ where: {login: payload.login, password: payload.password} }).then( result => {
			// let payload = {}
			console.log('login: ', result.dataValues.login)
			console.log('password: ', result.dataValues.password) 			
			// console.log('access granted') 
			// payload.login = result.dataValues.login
			// payload.password = result.dataValues.password
			// let token = jwt.sign(payload, 'secret')
 
			// console.log('token: ', token)  

			// bcrypt.hash('password', 10, (err, hash) =>{
			// 	console.log('hash: ', hash);
			// })  
      // res.status(200).send({token})
    })
      City.build({ cityName: req.body.cityName })
      .save()
      .then( result => {
        // you can now access the currently saved task with the variable anotherTask... nice!
        res.status(201).send(result)
      })
      .catch(error => {
        // Ooops, do some error-handling
      })        
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Edit city
async function editCity(req, res){   
  console.log('Edit request')
  console.log(req.params.id)
  console.log(req.body.cityName)
  try {
    await 
    City.findById(req.params.id).then( city => {
      city.update({
        cityName: req.body.cityName
      }).then( result => {
        return res.status(200).send(result);
      })
    })      	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Delete city
async function deleteCity(req, res){ 
  console.log('Delete request')
  console.log(req.params.id)
  try {
    await 
    City.destroy({
      where: {
        ID: req.params.id
      }
    }).then( result => {
      console.log(result)
      return res.sendStatus(204);
    })
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}
  