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
// Get all cities request hendling
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

//Create new city request hendling
async function createNewCity(req, res){    
  try {     
    console.log('city creation request')
    //sending token to decoder
    let adminCredentials = tokenDecoding(req.body.token);
    if (adminCredentials) {
      //if decoded correctly
      console.log('token decoded correctly')
      // verifying Admin credentials      
      if (await verifyAdmin(adminCredentials)) {
        // if Admin verified Creating new City
        console.log('Admin verified')
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
      } else {
        // if Admin not verified send status 401
        console.log('Admin not vryfied. Access denied')
        res.sendStatus(401)
      }
    } else {
      //if token is broken send status 400
      console.log('token cannot be decoded')
      res.sendStatus(400) 
    }
  // errors hendling send status 500
  } catch (err) {
    console.log(err)    
    res.sendStatus(500) 
  }  
}

//Edit city request hendling
async function editCity(req, res){   
  try {     
    console.log('Edit City request')
    //sending token to decoder
    let adminCredentials = tokenDecoding(req.body.token);
    if (adminCredentials) {
      //if decoded correctly
      console.log('token decoded correctly')
      // verifying Admin credentials      
      if (await verifyAdmin(adminCredentials)) {
        // if Admin verified then edit City
        console.log('Admin verified')
        City.findById(req.params.id).then( city => {
          city.update({
            cityName: req.body.cityName
          }).then( result => {
             // if successfully saved send status 200
            return res.status(200).send(result);
          })
        })
        .catch(error => {
          // if some errors - throw them to further handle
          throw error
        })
      } else {
        // if Admin not verified send status 401
        console.log('Admin not vryfied. Access denied')
        res.sendStatus(401)
      }
    } else {
      //if token is broken send status 400
      console.log('token cannot be decoded')
      res.sendStatus(400) 
    }
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
    //sending token to decoder
    let adminCredentials = tokenDecoding(req.body.token);
    if (adminCredentials) {
      //if decoded correctly
      console.log('token decoded correctly')
      // verifying Admin credentials      
      if (await verifyAdmin(adminCredentials)) {
        // if Admin verified then delete City
        console.log('Admin verified')
        City.destroy({
          where: {
            ID: req.params.id
          }
        }).then( result => {
          // if successfully deleted send status 204
          console.log(result)
          return res.sendStatus(204);
        })        
        .catch(error => {
          // if some errors - throw them to further handle
          throw error
        })
      } else {
        // if Admin not verified send status 401
        console.log('Admin not vryfied. Access denied')
        res.sendStatus(401)
      }
    } else {
      //if token is broken send status 400
      console.log('token cannot be decoded')
      res.sendStatus(400) 
    }
  // errors hendling send status 500
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}
  

   

///////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////
  
// Token decoding function
function tokenDecoding(token) {
  let payload = {}
  try {
    jwt.verify(token,'secret',(err, decoded) => {    
      console.log('decoded on city: ', decoded)
      payload.login = decoded.login
      payload.password = decoded.password    
    })
  } catch (error) {
    return false
  } 
  console.log('payload: ', payload)
  return payload;
}

// Verifying Admin function
async function verifyAdmin(credentials){
  let isAdmin = await Admin.findOne({ where: {login: credentials.login, password: credentials.password} }).then( result => {
    // let payload = {}
    if (result === null) {
      console.log('access denied')
      return false
    } else {
      console.log('login: ', result.dataValues.login)
      console.log('password: ', result.dataValues.password) 
      return true		
    }
  })  
  return isAdmin;
}
