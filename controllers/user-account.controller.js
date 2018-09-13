var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
// var bcrypt = require('bcrypt')

var checkUserRegistered = require('./checkUserAuth.controller')
var User = require('../models/User')

router.get('/', checkUserRegistered, userAccountData)
// router.post('/', registerUser);
// router.put('/:id', checkRegistered, editCity);
// router.delete('/:id', checkRegistered, deleteCity);

module.exports = router

// Functions
/// Get  user account data
async function userAccountData (req, res) {
  try {
    var token = req.header('authorization').split(' ')[1]
    let payload = tokenDecoding(token)

    // console.log('userAccountData requst header', ( req.header('Authorization') ) )
    await
    User.findOne({ where: { regToken: payload.regToken } })
      .then(result => {
        let user = result.get({ plain: true })
        let UserData = {
          userName: user.userName,
          userEmail: user.userEmail
        }
        return res.status(200).send(UserData)
      })
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

// async function registerUser(req,res){
//   try {
//     console.log('register req', req.body)
//     let userEmail = req.body.email
//     let encryptedPassword
//     bcrypt.hash(req.body.password, 10, (err, hash) =>{
//       console.log("hash ", hash)
//       encryptedPassword = hash
//     })
//     await
//     User.findOne({ where: {userEmail: userEmail} }).then( user => {
//       console.log(user.get({ plain: true }))
//       user.update({
//         isRegistered: 1,
//         password: encryptedPassword
//       }).then( result => {
//         // if successfully saved send status 200
//       res.status(200).send(result.get({ plain: true }));
//       })
//     }).catch(error => {
//       // if some errors - throw them to further handle
//       throw error
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

/// helper functions

// Token decoding function
function tokenDecoding (token) {
  console.log('start decoding')
  // console.log('start decoding token: ', token)
  let payload = {}
  try {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        throw Error(err)
      }
      console.log('decoded token: ', decoded)
      payload = decoded
      // payload.login = decoded.login
      // payload.password = decoded.password
    })
  } catch (error) {
    return false
  }
  console.log('token succesfully decoded ')
  return payload
}
