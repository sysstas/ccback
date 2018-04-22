var express = require('express')
var router = express.Router()
var Master = require('../models/Master')

//sendgrid config
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/', makeOrder);

module.exports = router;

// Function
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
  let dateMsg = req.body.dateMsg;
  let startTime = busyObj.time[0];
  let duration = busyObj.time.length;

  var msg = {
    to: userEmail,
    from: 'noreply@cc.com',
    subject: 'Clockwise Clockwork master order',
    text: ' ',
    html: '<strong>Hello, '+userName+'.&#13;&#10; Thank you for order.'+'\n'+' Master '+masterName+' will come to you at '+ startTime+' '+dateMsg+' and will repear your clock in about '+duration+' hours Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong>'
  }
  console.log(msg)
  sgMail.send(msg)
}