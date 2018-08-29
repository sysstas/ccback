var Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')
////////////////HELPER FUNCTIONS////////////////////////////////////////////////////////////
  
// Token decoding function
function tokenDecoding(token) {
  console.log('start decoding')
  // console.log('start decoding token: ', token)  
  let payload = {}
  try {
    jwt.verify(token,'secret',(err, decoded) => {    
      // console.log('decoded token: ', decoded)
      payload.login = decoded.login
      payload.password = decoded.password    
    })
  } catch (error) {
    return false
  } 
  console.log('token succesfully decoded ')
  return payload;
}
  
  // Verifying Admin function
  async function verifyAdmin(credentials){
    let isAdmin = await Admin.findOne({ where: {login: credentials.login, password: credentials.password} }).then( result => {
      // let payload = {}
      if (result === null) {
        console.log('access denied')
        return false
      } else {
        console.log('login: ', result.dataValues.login)
        console.log('password: ', result.dataValues.password) 
        return true		
      }
    })  
    return isAdmin;
  }
  
  
  
  ///Auth function
  var checkAuthenticated = async function checkAuthenticated(req, res, next){
   
    if (req.header('Authorization') === 'token null') {
      console.log('Authorization fails: missing auth header')
      return res.sendStatus(401).send('Unathorized. Missing auth header')
    }
    var token =  req.header('authorization').split(' ')[1]
    console.log('auth token: ', token)
    //sending token to decoder
    let adminCredentials = tokenDecoding(token);
    if (adminCredentials) {
      //if decoded correctly
      // console.log('token decoded correctly')
      // verifying Admin credentials      
      if (await verifyAdmin(adminCredentials)) {
        // if Admin verified then next()
        console.log('Admin verified')
        next()
      } else {
        // if Admin not verified send status 401
        console.log('Admin not vryfied. Access denied')
        res.sendStatus(401)
      }
    } else {
      //if token is broken send status 400
      console.log('token cannot be decoded')
      res.sendStatus(400) 
    } 
  }

  module.exports = checkAuthenticated;