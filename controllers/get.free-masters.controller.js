var express = require('express')
var router = express.Router()
var Master = require('../models/Master')

router.post('/', getFreeMasters);

module.exports = router;

// Function
async function getFreeMasters(req, res) {
	try {
		var city = req.body.city
		var date = req.body.date
		var time = req.body.time
		var masters = await Master.find({
			$or:[
				/// element where master not work at all yet or not work in choosen day
				{
					city: city,
					busy: {
						$not:{
							$elemMatch: {
								date: date
							}
						}             
					}
				},
				/// elements where master works in choosen date, but is free in specific hours
				{
					city: city,
					busy: { 
						$elemMatch: {
							date: date,
							time: {$nin: time}
						}
					}
				}
			] 
		}, '-__v')
		res.send(masters)
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}   
}