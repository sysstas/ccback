var express = require('express')
var router = express.Router()
var Master = require('../models/Master')

router.post('/', getMastersSchedule);

module.exports = router;

// Function
async function getMastersSchedule(req, res) {
	try {
		let { city, date }  = req.body		
		let masters = await Master.find({city: city})
		masters.forEach((master, index, array)=> {
			console.log(master.busy)
			master.busy = master.busy.filter(filerByDate)
			function filerByDate(element){
				return element.date == date
			}
			if (master.busy.length == 0){
				master.busy.push({time: []})
			}
			console.log(master.busy)
		})
		res.send(masters)
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}
}