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
    Master.findById(id, (err, mast) => { 
      console.log("current busy data")
      console.log(mast.busy)
      /// if there is no data in busy array, we need to assign there busyObj
      if (mast.busy.length == 0) {
        console.log("no busy data")
        mast.busy = busyObj
        mast.save((err, result) => {
          if(err)
            console.log('saving city error')
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
                console.log('saving city error')
                res.sendStatus(200)
            })        
          }   
        })
        /// if master works on some other day we just push busyObj to busy array
        if(!workingToday){
          mast.busy.push(busyObj)
          mast.save((err, result) => {
            if(err)
              console.log('saving city error')
            res.sendStatus(200)
          })
        }
      }
    })
    // sending email to user 
    var msg = {
      to: userEmail,
      from: 'noreply@cc.com',
      subject: 'Clockwise Clockwork master order',
      text: 'Hello, '+userName+'. Thank you for order.',
      html: '<strong>Visit our <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">site</a> again if you have another clock to repear</strong>'
    }
    console.log("message send")
    sgMail.send(msg)
  }