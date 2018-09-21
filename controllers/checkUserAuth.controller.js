var auth = require('./checkAuth.controller')

var checkUserAuthenticated = async function checkUserAuthenticated (req, res, next) {
  if (!req.header('Authorization') || (req.header('Authorization') === 'token null')) {
    return res.sendStatus(401)
  }
  var token = req.header('authorization').split(' ')[1]
  // sending token to decoder
  let userCredentials = auth.tokenDecoding(token)
  if (userCredentials) {
    // if decoded correctly
    // verifying  credentials
    if (await verifyUserRegistration(userCredentials)) {
      // if  verified then next()
      next()
    } else {
      // if  not verified send status 401
      res.sendStatus(401)
    }
  } else {
    // if token is broken send status 400
    res.sendStatus(400)
  }
}

// Verifying user registration function
function verifyUserRegistration (credentials) {
  if (credentials.isRegistered !== 1) {
    return false
  } else {
    return true
  }
}

module.exports = {
  checkUserAuthenticated: checkUserAuthenticated, 
  verifyUserRegistration: verifyUserRegistration
}
