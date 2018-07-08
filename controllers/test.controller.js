var express = require('express')
var router = express.Router()

var Master = require('../models/Master')
var City = require('../models/City')
Master.belongsTo(City, {foreignKey: 'cityId'})
router.post('/', test)


module.exports = router;
/// Functions
// Get all orders
async function test(req, res) {
	try {
    await 
    Master.findAll({ include: [City]}).then(result => {
      console.log(result)
      res.status(200).send(result) 
    })

    // Master.find({ where: {id: req.body.id}, include: [City]}).then(result => {
    //     console.log(result)
    //     res.status(200).send(result) 
    //   })           
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}