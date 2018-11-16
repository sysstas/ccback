const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function mail (req) {
  const masterName = req.body.masterName
  const userEmail = req.body.userEmail
  const userName = req.body.userName
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const dateMsg = new Date(req.body.dateMsg).toLocaleDateString('en-US', options)
  const startTime = req.body.time
  const duration = req.body.duration
  const msg = {
    to: userEmail,
    from: 'noreply@cc.com',
    subject: 'Clockwise Clockwork master order',
    text: ' ',
    html: `
            <h3>Hello, ${userName}.</h3>
            <p><strong> Thank you for order.</strong></p>
            <p> Master ${masterName} will come to you at ${startTime}:00 ${dateMsg} and will repear your clock in about ${duration} hours.</p>        
            <p>You are registered user</p> 
            <p>You can access your personal area on out site here </p>
            <p>Your <a href="http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com/">Clockwise Clockwork</a></p>
            ` }
  //sgMail.send(msg)
  return
}

module.exports = mail
