var jwt = require('jsonwebtoken')
/// /////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////

/// Auth function
var checkAuthenticated = function checkAuthenticated (req, res, next) {
  if (!req.header('Authorization') || (req.header('Authorization') === 'token null')) {
    return res.sendStatus(401)
  }
  var token = req.header('authorization').split(' ')[1]
  // sending token to decoder
  let adminCredentials = tokenDecoding(token)
  if (adminCredentials) {
    // if decoded correctly verifying Admin credentials
    if (verifyAdmin(adminCredentials)) {
      // if Admin verified then next()
      next()
    } else {
      // if Admin not verified send status 401
      res.sendStatus(401)
    }
  } else {
    // if token is broken send status 400
    res.sendStatus(400)
  }
}

// Token decoding function
function tokenDecoding (token) {
  let payload = {}
  try {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) throw Error
      payload = decoded
    })
  } catch (error) {
    return false
  }
  return payload
}


// Verifying Admin function
function verifyAdmin (credentials) {
  if (credentials.isAdmin !== 1) {
    return false
  } else {
    return true
  }
}

module.exports = {
  checkAuthenticated: checkAuthenticated,
  verifyAdmin: verifyAdmin,
  tokenDecoding: tokenDecoding
}
