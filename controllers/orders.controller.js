var express = require('express')
var router = express.Router()

var Master = require('../models/Master')
var City = require('../models/City')
var Order = require('../models/Order')
var Client = require('../models/Client')

Order.belongsTo(City, {foreignKey: 'cityId'})
Order.belongsTo(Master, {foreignKey: 'masterId'})
Order.belongsTo(Client, {foreignKey: 'clientId'})


//sendgrid config
//const sgMail = require('@sendgrid/mail')
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', getAllOrders)
router.post('/', createNewOrder);
router.put('/:id', editOrder);
router.delete('/:id', deleteOrder);

module.exports = router;

/// Functions
// Get all orders
async function getAllOrders(req, res) {
	try {
    await 
    Order.findAll({ include: [City, Master, Client]}).then(result => {
      console.log(result)
      res.status(200).send(result) 
    })           
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

//Create new order
async function createNewOrder(req, res){
  console.log('creation request')
  console.log(req.body)
  try {
    await 
    Order.build({ 
      cityID: req.body.cityID,
      masterID: req.body.masterID,
      clientID: req.body.clientID,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration
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

//Edit order
async function editOrder(req, res){//   
  console.log('Edit request')
  //console.log(req.params.id)
  //console.log(req.body.cityName)
  try {
    await 
    Order.findById(req.params.id).then( order => {
      order.update({ 
        cityID: req.body.cityID,
        masterID: req.body.masterID,
        clientID: req.body.clientID,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration
      }).then( result => {
        return res.status(200).send(result);
      })
    })      	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

//Delete order
async function deleteOrder(req, res){ 
  console.log('Delete request')
  console.log(req.params.id)
  try {
    await 
    Order.destroy({
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








  // sending email to user 

  // let masterName = req.body.masterName;
  // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // let dateMsg = new Date(req.body.dateMsg).toLocaleDateString("en-US",options)
  // let startTime = busyObj.time[0];
  // let duration = busyObj.time.length;
  


  // var msg = {
  //   to: userEmail,
  //   from: 'noreply@cc.com',
  //   subject: 'Clockwise Clockwork master order',
  //   text: ' ',
  //   html: '<h3>Hello, '+userName+'.</h3><p><strong> Thank you for order.</p><p> Master '+masterName+' will come to you at '+ startTime+':00 '+dateMsg+' and will repear your clock in about '+duration+' hours.</p><p> Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong></p>'
  // }
  // console.log(msg)

  // sgMail.send(msg)

// }

// GET

/// Get all orders
// async function getAllOrders(req, res){
//   let sql = `
//   SELECT 
//     orders.ID,
//     orders.cityID,
//     cities.cityName,
//     orders.masterID,
//     masters.masterName,
//     orders.clientID,
//     clients.clientName,
//     clients.clientEmail,
//     orders.date,
//     orders.time,
//     orders.duration
//   FROM orders
//   LEFT JOIN cities 
//     ON orders.cityID = cities.ID
//   LEFT JOIN masters
//     ON orders.masterID = masters.ID
//   LEFT JOIN clients
//     ON orders.clientID = clients.ID
// `
//   try {
//     await connection.query(sql, function(er, response){
//       if (!er) 
//       console.log(response)
//       res.status(200).send(response)        
//     });	  	
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}    
// }

// /// Create Order
// async function makeOrder(req, res){
//   console.log('request: ', req.body)
//   let sql = `
//   INSERT INTO orders (
//     cityID, 
//     masterID,
//     clientID,
//     date,
//     time,
//     duration
//   ) 
//   VALUES(
//     ${req.body.cityID},
//     ${req.body.masterID},
//     ${req.body.clientID},
//     ${req.body.date},
//     ${req.body.time},
//     ${req.body.duration}
//   )
//   `
//   console.log(sql)
//   try {
//     await connection.query(sql, function(er, result){
//       if (!er) 
//       console.log(result)
//       res.status(201).send(result)
//     });    
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}    
// }

// async function editOrder(req, res){
//   console.log(req.body) 
//   let sql =`
//   UPDATE orders 
//     SET 
//       cityID = ${req.body.cityID}, 
//       masterID = ${req.body.masterID},
//       clientID = ${req.body.clientID},
//       date = ${req.body.date},
//       time = ${req.body.time},
//       duration = ${req.body.duration}        
//   WHERE ID = ${req.params.id}
//   ` 
//   console.log(sql)
//   try {
//     await connection.query(sql, function(er, result){
//       if (!er) 
//       console.log(result)
//       res.status(201).send(result)
//     });     
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}    
// }

// async function deleteOrder(req, res){
//   let sql = "DELETE FROM orders WHERE ID = '"+req.params.id+"'" 
//   console.log(sql)
//   try {
//     await connection.query(sql, function(er, result){
//       if (!er) 
//       console.log(result)
//       res.status(201).send(result)
//     });     
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}    
// }






