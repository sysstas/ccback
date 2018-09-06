var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')
////////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////
  

  

  
  
  
///Auth function
var checkUserAuthenticated = async function checkUserAuthenticated(req, res, next){
  
  if (req.header('Authorization') === 'token null') {
    console.log('Authorization fails: missing auth header')
    return res.sendStatus(401).send('Unathorized. Missing auth header')
  }
  var token =  req.header('authorization').split(' ')[1]
  // console.log('auth token: ', token)
  //sending token to decoder
  let userCredentials = tokenDecoding(token);
  if (userCredentials) {
    //if decoded correctly
    // console.log('token decoded correctly')
    // verifying  credentials      
    if (await verifyUserRegistration(userCredentials)) {
      // if  verified then next()
      console.log('Registration verified')
      next()
    } else {
      // if  not verified send status 401
      console.log('User not registered. Access denied')
      res.sendStatus(401)
    }
  } else {
    //if token is broken send status 400
    console.log('token cannot be decoded')
    res.sendStatus(400) 
  } 
}

  // Token decoding function
function tokenDecoding(token) {
  console.log('start decoding')
  // console.log('start decoding token: ', token)  
  let payload = {}
  try {
    jwt.verify(token,'secret',(err, decoded) => {    
      console.log('decoded token: ', decoded)
      payload = decoded
      // payload.login = decoded.login
      // payload.password = decoded.password    
    })
  } catch (error) {
    return false
  } 
  console.log('token succesfully decoded ')
  return payload;
}

  // Verifying Admin function
  async function verifyUserRegistration(credentials){
    if (credentials.isRegistered!==1) {
      console.log('access denied')
      return false
    } else {
      return true		
    }
  }

  module.exports = checkUserAuthenticated;