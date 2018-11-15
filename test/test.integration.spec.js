// process.env.NODE_ENV = 'test'
// let chai = require('chai')
// let chaiHttp = require('chai-http')
//
//
// let app = require('../index')
// // require('../index').testenv()
// let server = app.server
// // let shotdown = app.shutdown
// // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',process.env.NODE_ENV)
//
// var Master = require('../models/master')
// var City = require('../models/city')
// var Order = require('../models/order')
// var User = require('../models/user')
// require('dotenv').config();
//
// chai.should()
// chai.use(chaiHttp)
//
// describe('APP INTEGRATION', () => {
//

//
//
//
//
//

//
//   // AUTH.CONTROLLER
//   describe('Testing auth.controller', () => {
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//
//       await User.sync()
//       await User.build({
//         userName: 'User Testig Orders',
//         userEmail: 'user@test.test',
//         isAdmin: 1,
//         isRegistered: 1,
//         regToken: '55494fb1d45b64c3810499224abe322f',
//         password: '$2b$10$b/e4EJXrGahAot08mmSPH.L.0JZ.xu4w8bXP.eJ5X81ndHG9sKxJq'
//       })
//       .save()
//     })
//
//     describe('Testing login when DB is up', () => {
//       it('should return status 200 and jwt token when there is such user in DB and password is correct', (done) => {
//         chai.request(server)
//         .post('/login')
//         .send({
//           login: 'user@test.test',
//           password: 'pwd'
//         })
//         .end((err, res) => {
//           if (err) {
//             // console.log("ERROR", err)
//           }
//           // console.log(res.body)
//           res.should.have.status(200)
//           res.body.token.should.be.a('string')
//           done()
//         })
//       })
//
//       it('should return status 401, when password is incorrect', (done) => {
//         chai.request(server)
//         .post('/login')
//         .send({
//           login: 'user@test.test',
//           password: 'passwordsecret'
//         })
//         .end((err, res) => {
//           if (err) {
//             console.log("ERROR", err)
//           }
//           res.should.have.status(401)
//           done()
//         })
//       })
//     })
//
//     describe('Testing login whe DB is down or internal error', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//         .post('/login')
//         .send({
//           login: 'admin@dsf',
//           password: 'asdfasdf'
//         })
//         .end((err, res) => {
//           if (err) {
//             console.log("ERROR", err)
//           }
//           res.should.have.status(500)
//           done()
//         })
//       })
//
//     })
//
//
//   })
//

//

//
//   after(async () => {
//     require('../index').shutdown()
//
//   })
// })
