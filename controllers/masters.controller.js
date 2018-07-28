var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
Master.belongsTo(City, {foreignKey: 'cityId'})

router.get('/', getAllMasters);
router.post('/', checkAuthenticated, createNewMaster);
router.put('/:id', checkAuthenticated, editMaster);
router.delete('/:id', checkAuthenticated, deleteMaster);

module.exports = router;

// Functions
// Get all masters request hendling
async function getAllMasters(req, res) {
	try {
     await 
     Master.findAll({ include: [City]}).then(result => {
      console.log(result)
      res.status(200).send(result) 
    })           
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

//Create new master request hendling
async function createNewMaster(req, res){  
  try {     
    console.log('Master creation request')
      Master.build({ 
        masterName: req.body.masterName,
        cityID: req.body.cityID,
        masterRating: req.body.masterRating
      })
        .save()
        .then( result => {
        // if successfully saved send status 201
          res.status(201).send(result)
        })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })
  // errors hendling send status 500
  } catch (err) {
    console.log(err)    
    res.sendStatus(500) 
  }  
}
  
//Edit master request hendling
async function editMaster(req, res){ 
  try {  
    console.log("body ",req.body) 
    console.log("id  ",req.params.id)      
    Master.findById(req.params.id).then( master => {
      master.update({ 
        masterName: req.body.masterName,
        cityID: req.body.cityID,
        masterRating: req.body.masterRating
      }).then( result => {
      // if successfully saved send status 201
        return res.status(200).send(result);
      })
    })
    .catch(error => {
      // if some errors - throw them to further handle
      throw error
    })      
  // errors hendling send status 500
  } catch (err) {
    console.log(err)    
    res.sendStatus(500) 
  }  
}

//Delete master request hendling
async function deleteMaster(req, res){ 
  try {     
    console.log('Master delete request')
      Master.destroy({
        where: {
          ID: req.params.id
        }
      }).then( result => {
        console.log(result)
        return res.sendStatus(204)        
      })
      .catch(error => {
        // if some errors - throw them to further handle
        throw error
      })      
  // errors hendling send status 500
  } catch (err) {
    console.log(err)    
    res.sendStatus(500) 
  }  
}

////////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////
  
// Token decoding function
function tokenDecoding(token) {
  let payload = {}
  try {
    jwt.verify(token,'secret',(err, decoded) => {    
      console.log('decoded token: ', decoded)
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



///Auth function
async function checkAuthenticated(req, res, next){
 
  if (req.header('Authorization') === 'token null') {
    console.log('Authorization fails: missing auth header')
    return res.sendStatus(401).send('Unathorized. Missing auth header')
  }
  var token =  req.header('authorization').split(' ')[1]
  console.log('auth token: ', token)
  //sending token to decoder
  let adminCredentials = tokenDecoding(token);
  if (adminCredentials) {
    //if decoded correctly
    console.log('token decoded correctly')
    // verifying Admin credentials      
    if (await verifyAdmin(adminCredentials)) {
      // if Admin verified then next()
      console.log('Admin verified')
      next()
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
}