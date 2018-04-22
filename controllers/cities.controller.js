var express = require('express')
var router = express.Router()
var City = require('../models/City')

router.get('/', getAllCities);
router.post('/', createNewCity);
router.put('/:id', editCity);
router.delete('/:id', deleteCity);

module.exports = router;

/// Functions
async function getAllCities(req, res) {
	try {
		var cities = await City.find({}, '-__v') 
		res.status(200).send(cities)
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}  
}

async function createNewCity(req, res) {
	var newCity = req.body
	var city = new City(newCity)
	city.save((err, result) => {
		if(err){
			console.log(err)
			return res.status(500).send(err);      
		}
		console.log(result)
		res.status(201).send({id: result._id, cityName: result.cityName})
	})  
}

async function editCity(req, res) {
	City.findByIdAndUpdate(      
		req.params.id,
		req.body,    
		{new: true},
		(err, result) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send({id: result._id, cityName: result.cityName});
		}
	)
}

async function deleteCity(req, res) {
	City.findByIdAndRemove(req.params.id, (err, result) => {  
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}
		const response = {
			message: "City successfully deleted"
		};
		console.log("City deleted")
		return res.status(204).send(response);
	});
}
  