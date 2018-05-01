var express = require('express')
var router = express.Router()
var Master = require('../models/Master')
var Order = require('../models/Order')

//sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get('/', getAllOrders)
router.post('/', makeOrder);
router.delete('/:id', deleteOrder);

module.exports = router;

/// Functions
// POST
async function makeOrder(req, res) {  
  var id = req.body.id
  var date = req.body.date
  var time = req.body.time
  var busyObj = {
    date: date,
    time: time
  }
  var userName = req.body.userName
  var userEmail = req.body.userEmail
  console.log(req.body)
  let orderDetail = {
    date: date,
    time: time[0],
    duration: time.length,
    masterName: req.body.masterName,
    clientEmail: userEmail,
    clientName: userName,
    city: req.body.city
  } 
  let orderId = null
  let createNewOrder = new Order(orderDetail)
  createNewOrder.save((err, result) => {
		if(err){
			console.log(err)
			return res.status(500).send(err);      
		}
    orderId = result._id
    console.log(orderId)
	})  
  Master.findById(id, (err, mast) => { 
    /// if there is no data in busy array, we need to assign there busyObj
    if (mast.busy.length == 0) {
      mast.busy = busyObj
      mast.save((err, result) => {
        if(err)
          console.log('saving data error')
        res.sendStatus(200)
      })
    ///  if busy array contain some data
    } else{
      var workingToday = false
      mast.busy.forEach((element, index, array)=> {
        /// checking if master works tooday we need to merge busy.time and time arrays for avoiding date duplicatig
        if (array[index].date == date) {      
          workingToday = true
          mast.busy[index].time  = mast.busy[index].time.concat(time)
          /// will not work if we not mark changes here
          mast.markModified("busy")          
          mast.save((err, result) => {
            if(err)
              console.log('saving data error')
              res.sendStatus(200)
          })        
        }   
      })
      /// if master works on some other day we just push busyObj to busy array
      if(!workingToday){
        mast.busy.push(busyObj)
        mast.save((err, result) => {
          if(err)
            console.log('saving data error')
          res.sendStatus(200)
        })
      }
    }
  })
  // sending email to user 
  let masterName = req.body.masterName;
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let dateMsg = new Date(req.body.dateMsg).toLocaleDateString("en-US",options)
  let startTime = busyObj.time[0];
  let duration = busyObj.time.length;

  var msg = {
    to: userEmail,
    from: 'noreply@cc.com',
    subject: 'Clockwise Clockwork master order',
    text: ' ',
    html: '<h3>Hello, '+userName+'.</h3><p><strong> Thank you for order.</p><p> Master '+masterName+' will come to you at '+ startTime+':00 '+dateMsg+' and will repear your clock in about '+duration+' hours.</p><p> Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong></p>'
  }
  console.log(msg)
  // sgMail.send(msg)
}

// GET
async function getAllOrders(req, res){
  try {
		var orders = await Order.find({}, '-__v') 
		res.status(200).send(orders)
	} catch (error) {
		console.log(error)    
		res.sendStatus(500)
	}    
}

// DELETE
async function deleteOrder(req, res){
  try {
    await Order.findByIdAndRemove(req.params.id, (err, result)=>{
      try {
        console.log("Order deleted")
        return res.status(204).send(result)
      } catch (error) {
        console.log(error)
        res.sendStatus(500)
      }
    });
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}