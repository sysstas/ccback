var express = require('express')
var router = express.Router()
var Client = require('../models/Client')

// router.get('/', getAllClients);
// router.post('/', createNewClient);
// router.put('/:id', editClient);
// router.delete('/:id', deleteClient);

module.exports = router;

// Functions



// async function getAllClients(req, res) {
// 	try {
// 		let clients = await Client.find({}, '-__v') 
// 		res.send(clients)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}  
// }

// async function createNewClient(req, res) {
// 	let client = req.body
// 	let { name, email } = req.body	
// 	let exist = await Client.find({ email: email})
// 	if (exist.length > 0){
// 		console.log("exist") 
// 	} else {
// 		let newClient = new Client(client)
// 		await newClient.save((err, result) => {
// 			if(err)
// 			console.log('saving client error')
// 			res.status(201).send({id: result._id, name: result.name, email: result.email}) 
// 			console.log(result)
// 		})
// 	}
// }

// async function editClient(req, res) {
// 	await Client.findByIdAndUpdate(req.params.id,
// 		req.body,
// 		{new: true},      
// 		(err, result) => {
// 			if(err) {
// 					console.log(err)
// 					return res.status(500).send(err)
// 			}
// 			console.log(result)
// 			res.status(200).send({id: result._id, name: result.name, email: result.email})
// 		}
// 	)
// }

// async function deleteClient(req, res) {
// 	await Client.findByIdAndRemove( req.params.id, (err, result) => {  
// 		if (err) {
// 			console.log(err)
// 			return res.status(500).send(err);
// 		}
// 		const response = {
// 			message: "Client successfully deleted"
// 		}
// 		console.log("Client deleted")
// 		return res.status(204).send(response);  
// 	});
// }
