var express = require('express')
var router = express.Router()
var Master = require('../models/Master')

router.get('/', getAllMasters);
router.post('/', createNewMaster);
router.put('/:id', editMaster);
router.delete('/:id', deleteMaster);

module.exports = router;

// Functions
async function getAllMasters(req, res) {
	try {
		var masters = await Master.find({}, '-__v')
		res.status(200).send(masters)
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}      
}

async function createNewMaster(req, res) {
	var newMaster = req.body
	var master = new Master(newMaster)
	master.save((err, result) => {
		if(err){
			console.log('saving master error')
			return res.status(500).send(err);
		}
		res.status(201).send({id: result._id, name: result.name, city: result.city, rating: result.rating})
		console.log(result)
	})  
}

async function editMaster(req, res) {  
	Master.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true},      
		(err, result) => {
			if(err) {
				console.log(err)
				return res.status(500).send(err)
			}
			console.log(result)
			res.status(200).send({id: result._id, name: result.name, city: result.city, rating: result.rating})
		}
	)
}

async function deleteMaster(req, res) {
	Master.findByIdAndRemove( req.params.id, (err, result) => {  
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		}
		const response = {
			message: "Master successfully deleted"
		}
		console.log("Master deleted")
		return res.status(204).send(response);  
	});
}
