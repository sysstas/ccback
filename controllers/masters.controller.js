var express = require('express')
var router = express.Router()
var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
Master.belongsTo(City, {foreignKey: 'cityId'})

router.get('/', getAllMasters);
router.post('/', createNewMaster);
router.put('/:id', editMaster);
router.delete('/:id', deleteMaster);

module.exports = router;

// Functions
// Get all masters
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

//Create new master
async function createNewMaster(req, res){
    console.log('creation request')
    //console.log(req.body.clientName)
    try {
      await 
      //Checking is user Admin
      AuthCheck( req.body.token)
      Master.build({ 
        masterName: req.body.masterName,
        cityID: req.body.cityID,
        masterRating: req.body.masterRating
      })
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
  
//Edit master
async function editMaster(req, res){//   
  console.log('Edit request')
  //console.log(req.params.id)
  //console.log(req.body.cityName)
  try {
    await 
    //Checking is user Admin
    AuthCheck( req.body.token)
    Master.findById(req.params.id).then( master => {
      master.update({ 
        masterName: req.body.masterName,
        cityID: req.body.cityID,
        masterRating: req.body.masterRating
      }).then( result => {
        return res.status(200).send(result);
      })
    })      	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Delete master
async function deleteMaster(req, res){ 
  console.log('Delete request')
  console.log(req.params.id)
  try {
    await 
    //Checking is user Admin
    AuthCheck( req.body.token)
    Master.destroy({
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


function AuthCheck(token){
  let payload = {}
  jwt.verify(token,'secret',(err, decoded) => {
    console.log('decoded on city: ', decoded)
    payload.login = decoded.login
    payload.password = decoded.password
  })
  // If there no such Admin in DB - node will throw an error
  Admin.findOne({ where: {login: payload.login, password: payload.password} })
  .then( result => {
    console.log('login: ', result.dataValues.login)
    console.log('password: ', result.dataValues.password) 
  })
}
