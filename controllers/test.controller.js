var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var Client = require('../models/Client')

// Order.belongsTo(City, {foreignKey: 'cityId'})
// Order.belongsTo(Master, {foreignKey: 'masterId'})
// Order.belongsTo(Client, {foreignKey: 'clientId'})

var sequelize = require('../controllers/connection')
//var connection = require('./connection')
var Master = require('../models/Master')

router.post('/', getFreeMasters);

module.exports = router;

// Function
async function getFreeMasters(req, res) {
  console.log("Searching free masters")
  console.log(req.body) 

  let cityID = req.body.cityID;
  let date = req.body.date;
  let time = req.body.time;
  let duration = req.body.duration;
  let allMastersFromCity = []
  let busyMasters = []
  // let freeMasters = []
	try {
    await 
    
    sequelize.query(`  
    SELECT  m.ID, m.masterName
    FROM masters m
    WHERE m.cityID = 16;
    `, { type: sequelize.QueryTypes.SELECT})
    .then(masters => {
    allMastersFromCity = masters
    // console.log(masters)
    //  res.status(200).send(masters)  
    })	
    await 
     
    sequelize.query(`  
    SELECT  m.ID, m.masterName
    FROM masters m 
    LEFT JOIN orders o 
  	ON m.ID = o.masterID    
	  WHERE 
		(
			o.date = 1535662800000 
			AND 
			(o.time  BETWEEN 8 AND (8+1-1) )
			OR
			(
				(o.time + 1 -1)  BETWEEN 8 AND (8+1-1)
			)            
		)	
    AND m.cityID = 16
    GROUP BY m.ID
    `, { type: sequelize.QueryTypes.SELECT})
    .then(masters => {
    busyMasters = masters
     
      console.log("busyMasters", busyMasters)
      console.log("allMastersFromCity", allMastersFromCity)
      let freeMasters = []
      for (let index = 0; index < busyMasters.length; index++) {
        console.log("busyMasters[]", busyMasters[index].ID)
        freeMasters = allMastersFromCity.filter(element =>{
          return element.ID !=  busyMasters[index].ID
           
        })
      }

    res.status(200).send(freeMasters)  
    })	

 

	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
  } 
  
  
}