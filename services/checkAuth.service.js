const verifyJWTToken = require('../helpers/jwtvalidate.helper')
const logger = require('./logger.service')

/// /////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////

/// Validating authorization token and return next() if user is an admin
async function checkAdminAuthorization (req, res, next) {
  const tokenPayload = await validateToken(req, res)
  const isAdmin = tokenPayload['http://isAdmin/']
  logger.info(`Is user admin:  ${!!isAdmin}`)
  if (isAdmin) {
    next()
  }
  if (!isAdmin) {
    res.sendStatus(401)
  }
}

/// Validate authorization token and return it's payload when valid otherwise 401
async function validateToken (req, res) {
  if (!req.header('Authorization')) {
    return res.sendStatus(401)
  }
  const token = extractAuthenticationToken(req)
  let tokenPayload
  try {
    tokenPayload = await verifyJWTToken(token)
  } catch (err) {
    logger.error(`Token validation error:  ${err}`)
    console.log(err)
    res.sendStatus(401)
  }
  return tokenPayload
}

// Token decoding function
// function tokenDecoding (token) {
//   let payload = {}
//   try {
//     jwt.verify(token, 'secret', (err, decoded) => {
//       if (err) throw Error
//       payload = decoded
//     })
//   } catch (error) {
//     return false
//   }
//   return payload
// }

// Verifying Admin function
// function verifyAdmin (credentials) {
//   if (credentials.isAdmin !== 1) {
//     return false
//   } else {
//     return true
//   }
// }

// Extracts token from the authorization header
function extractAuthenticationToken (request) {
  const authHeader = request.headers.authorization
  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    throw new Error('credentials_required', { message: 'No authorization token was found' })
  }
  const scheme = parts[ 0 ]
  if (!/^Bearer$/i.test(scheme)) {
    throw new Error('credentials_bad_scheme', {
      message: 'Format is Authorization: Bearer [token]'
    })
  }
  return parts[ 1 ]
}

module.exports = {
  checkAdminAuthorization: checkAdminAuthorization,
  validateToken: validateToken,
  // tokenDecoding: tokenDecoding
}
