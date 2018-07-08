var express = require('express')
var router = express.Router()

var Master = require('../models/Master')


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
     Master.findAll().then(masters => {
        console.log(masters)
        res.status(200).send(masters) 
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
    Master.findById(req.params.id).then( city => {
      city.update({ 
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
