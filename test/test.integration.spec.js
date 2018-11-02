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
//   // CITIES.CONTROLLER
//   describe('Testing cities.controller', () => {
//     // before(async ()=>{
//     //   await City.sync()
//     // })
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//       await City.sync()
//       await City.destroy({
//         where: {},
//         truncate: true
//       })
//     })
//
//
//
//     describe('Testing POST', () => {
//       it('should Create city "Test" and return status 201 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .post('/cities')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'cityName': 'Test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(201)
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST Error handler ', () => {
//       beforeEach(async ()=>{
//         await Master.drop()
//         await City.drop()
//       })
//       after(async ()=>{
//         await City.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .post('/cities')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'cityName': 'Test222'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//       })
//       it('should GET all cities', (done) => {
//         chai.request(server)
//           .get('/cities')
//           .end((err, res) => {
//             res.should.have.status(200)
//             res.body.should.be.a('array')
//             res.body.length.should.be.eql(1)
//             res.body[0].cityName.should.be.eql('Test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET Error handler ', () => {
//       beforeEach(async ()=>{
//         await City.drop()
//       })
//       after(async ()=>{
//         await City.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .get('/cities')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//       })
//       it('should change value cityName to "TestChanged" of element with id=1 and return status 200 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .put('/cities/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'cityName': 'TestChanged'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(200)
//             res.body.cityName.should.be.eql('TestChanged')
//             // console.log(res.body)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT Error handler ', () => {
//       beforeEach(async ()=>{
//         await City.drop()
//       })
//       after(async ()=>{
//         await City.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .put('/cities/213')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'cityName': 'Test222'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//       })
//       it('should delete element with id=1 and return status 204 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .delete('/cities/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(204)
//             // console.log(res.body)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE Error handler ', () => {
//       beforeEach(async ()=>{
//         await City.drop()
//       })
//       after(async ()=>{
//         await City.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .delete('/cities/4')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//   })
//
//   // USERS.CONTROLLER
//   describe('Testing users.controller', () => {
//
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//       await User.sync()
//       await User.destroy({
//         where: {},
//         truncate: true
//       })
//     })
//
//
//
//     describe('Testing POST', () => {
//       it('should Create new user and return status 201 and req.body with id=1, isAdmin=0, isRegistered=0, regToken is STRING', (done) => {
//         chai.request(server)
//           .post('/users')
//           .send({
//             'userName': 'User Test',
//             'userEmail': 'user@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(201)
//             res.body.id.should.be.eql(1)
//             res.body.isAdmin.should.be.eql(0)
//             res.body.isRegistered.should.be.eql(0)
//             res.body.regToken.should.be.a('string')
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST behavier if user already exist in DB', () => {
//       beforeEach(async ()=>{
//         await User.build({
//           userName: 'User Test',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//       })
//       it('should return status 201 and req.body with id=1, isAdmin=1, isRegistered=1, regToken is STRING', (done) => {
//         chai.request(server)
//           .post('/users')
//           .send({
//             'userName': 'User Test',
//             'userEmail': 'user@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(201)
//             res.body.id.should.be.eql(1)
//             res.body.isAdmin.should.be.eql(1)
//             res.body.isRegistered.should.be.eql(1)
//             res.body.regToken.should.be.a('string')
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST Error handler ', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       after(async ()=>{
//         await User.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .post('/users')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'userName': 'User Test',
//             'userEmail': 'user@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET', () => {
//       beforeEach(async ()=>{
//         await User.build({
//           userName: 'User Test',
//           userEmail: 'user@test.test',
//           isAdmin: 0,
//           isRegistered: 0,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//       })
//       it('should GET all users', (done) => {
//         chai.request(server)
//           .get('/users')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(200)
//             res.body.should.be.a('array')
//             res.body.length.should.be.eql(1)
//             res.body[0].userName.should.be.eql('User Test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET Error handler ', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       after(async ()=>{
//         await User.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .get('/users')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT', () => {
//       beforeEach(async ()=>{
//         await User.build({
//           userName: 'User Test',
//           userEmail: 'user@test.test',
//           isAdmin: 0,
//           isRegistered: 0,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//       })
//       it('should change value userName to "TestChanged" and userEmail to "TestChanged@test.test" of element with id=1 and return status 200 if Admin authenticated', (done) => {
//         chai.request(server)
//           .put('/users/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             userName: 'TestChanged',
//             userEmail: 'TestChanged@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(200)
//             res.body.userName.should.be.eql('TestChanged')
//             res.body.userEmail.should.be.eql('TestChanged@test.test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT Error handler ', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       after(async ()=>{
//         await User.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .put('/users/213')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             userName: 'TestChanged',
//             userEmail: 'TestChanged@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE', () => {
//       beforeEach(async ()=>{
//         await User.build({ cityName: "Test" })
//         .save()
//       })
//       it('should delete element with id=1 and return status 204 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .delete('/users/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(204)
//             // console.log(res.body)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE Error handler ', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       after(async ()=>{
//         await User.sync()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .delete('/users/4')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//   })
//
//   // MASTERS.CONTROLLER
//   describe('Testing masters.controller', () => {
//
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//       await City.sync()
//       await Master.sync()
//     })
//
//     describe('Testing POST', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//       })
//       it('should Create new master and return status 201 and req.body with id=1, masterName="Master Test", masterRating=5, cityId=1', (done) => {
//         chai.request(server)
//           .post('/masters')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'masterName': 'Master Test',
//             'masterRating': 5,
//             'cityId': 1
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             // console.log(res.body)
//             res.should.have.status(201)
//             res.body.id.should.be.eql(1)
//             res.body.masterName.should.be.eql('Master Test')
//             res.body.cityId.should.be.eql(1)
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST Error handler ', () => {
//       beforeEach(async ()=>{
//         await Master.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .post('/masters')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'masterName': 'Master Test',
//             'masterRating': 5,
//             'cityId': 1
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//       })
//       it('should GET all masters. ', (done) => {
//         chai.request(server)
//           .get('/masters')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(200)
//             res.body.should.be.a('array')
//             res.body.length.should.be.eql(1)
//             res.body[0].masterName.should.be.eql('Master Test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET Error handler ', () => {
//       beforeEach(async ()=>{
//         await Master.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .get('/masters')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//       })
//       it('should change value masterName to "TestChanged" and masterRating to 2 of element with id=1 and return status 200 if Admin authenticated', (done) => {
//         chai.request(server)
//           .put('/masters/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             'masterName': 'TestChanged',
//             'masterRating': 2,
//             'cityId': 1
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(200)
//             res.body.masterName.should.be.eql('TestChanged')
//             res.body.masterRating.should.be.eql(2)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT Error handler ', () => {
//       beforeEach(async ()=>{
//         await Master.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .put('/masters/213')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             userName: 'TestChanged',
//             userEmail: 'TestChanged@test.test'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//       })
//       it('should delete element with id=1 and return status 204 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .delete('/masters/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(204)
//             // console.log(res.body)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE Error handler ', () => {
//       beforeEach(async ()=>{
//         await Master.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .delete('/masters/4')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//   })
//
//   // ORDERS.CONTROLLER
//   describe('Testing orders.controller', () => {
//
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//
//       await User.sync()
//       await City.sync()
//       await Master.sync()
//       await Order.sync()
//
//     })
//
//     describe('Testing POST if user registered', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "TestingOrders" })
//         .save()
//         await Master.build({
//           masterName: 'Master Testing Orders',
//           masterRating: 5,
//           cityId: 1
//         })
//         .save()
//         await User.build({
//           userName: 'User Testig Orders',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//       })
//       it('should Create new order and return status 201 and res.body where cityId=1, masterId=1, userId=1, date=1537822800000, time=12, duration=1', (done) => {
//         chai.request(server)
//           .post('/orders')
//           .send({
//             cityID: 1,
//             masterID: 1,
//             user: {id:1, isRegistered:1},
//             date: 1537822800000,
//             time: 12,
//             duration: 1,
//             userEmail: 'i@i'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             // console.log("TEST response",res.body)
//             res.should.have.status(201)
//             res.body.cityId.should.be.eql(1)
//             res.body.userId.should.be.eql(1)
//             res.body.date.should.be.eql(1537822800000)
//             res.body.time.should.be.eql(12)
//             res.body.duration.should.be.eql(1)
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST if user not registered', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "TestingOrders" })
//         .save()
//         await Master.build({
//           masterName: 'Master Testing Orders',
//           masterRating: 5,
//           cityId: 1
//         })
//         .save()
//         await User.build({
//           userName: 'User Testig Orders',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 0,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//       })
//       it('should Create new order and return status 201 and res.body where cityId=1, masterId=1, userId=1, date=1537822800000, time=12, duration=1', (done) => {
//         chai.request(server)
//           .post('/orders')
//           .send({
//             cityID: 1,
//             masterID: 1,
//             user: {id:1, isRegistered:0},
//             date: 1537822800000,
//             time: 12,
//             duration: 1,
//             userEmail: 'i@i'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             // console.log("TEST response",res.body)
//             res.should.have.status(201)
//             res.body.cityId.should.be.eql(1)
//             res.body.userId.should.be.eql(1)
//             res.body.date.should.be.eql(1537822800000)
//             res.body.time.should.be.eql(12)
//             res.body.duration.should.be.eql(1)
//             done()
//           })
//       })
//     })
//
//     describe('Testing POST Error handler ', () => {
//       beforeEach(async ()=>{
//         await Order.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .post('/orders')
//           .send({
//             cityId: 1,
//             masterId: 1,
//             user: {id:1},
//             date: 1537822800000,
//             time: 12,
//             duration: 1,
//             userEmail: 'i@i'
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//         await User.build({
//           userName: 'User Testig Orders',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//         await Order.build({
//           cityId: 1,
//           masterId: 1,
//           userId: 1,
//           date: 1537822800000,
//           time: 12,
//           duration: 1
//         })
//       .save()
//       })
//       it('should GET all (there is one) orders with res.body where id=1, time=12, date=1537822800000, duration=1, city="Test", master="Master Test", userName="User Testig Orders", userEmail="user@test.test"', (done) => {
//         chai.request(server)
//           .get('/orders')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(200)
//             res.body.should.be.a('array')
//             res.body.length.should.be.eql(1)
//             res.body[0].id.should.be.eql(1)
//             res.body[0].time.should.be.eql(12)
//             res.body[0].date.should.be.eql(1537822800000)
//             res.body[0].duration.should.be.eql(1)
//             res.body[0].city.should.be.eql('Test')
//             res.body[0].master.should.be.eql('Master Test')
//             res.body[0].userName.should.be.eql('User Testig Orders')
//             res.body[0].userEmail.should.be.eql('user@test.test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET Error handler ', () => {
//       beforeEach(async ()=>{
//         await Order.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .get('/orders')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing PUT', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//         await User.build({
//           userName: 'User Testig Orders',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//         await Order.build({
//           cityId: 1,
//           masterId: 1,
//           userId: 1,
//           date: 1537822800000,
//           time: 12,
//           duration: 1
//         })
//       .save()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .put('/orders/213')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .send({
//             cityId: 1,
//             masterId: 1,
//             user: {id:1},
//             date: 1537822800000,
//             time: 12,
//             duration: 1
//           })
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//         await User.build({
//           userName: 'User Testig Orders',
//           userEmail: 'user@test.test',
//           isAdmin: 1,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '55494fb1d45b64c3810499224abe322f'
//         })
//         .save()
//         await Order.build({
//           cityId: 1,
//           masterId: 1,
//           userId: 1,
//           date: 1537822800000,
//           time: 12,
//           duration: 1
//         })
//       .save()
//       })
//       it('should delete element with id=1 and return status 204 if user Authenticated as Admin', (done) => {
//         chai.request(server)
//           .delete('/orders/1')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(204)
//             // console.log(res.body)
//             done()
//           })
//       })
//     })
//
//     describe('Testing DELETE Error handler ', () => {
//       beforeEach(async ()=>{
//         await Order.drop()
//       })
//       it('should return status 500', (done) => {
//         chai.request(server)
//           .delete('/orders/4')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             if (err) {
//               console.log("ERROR", err)
//             }
//             res.should.have.status(500)
//             done()
//           })
//       })
//     })
//
//   })
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
//   // USER-ACCOUNT.CONTROLLER
//   describe('Testing user-account.controller', () => {
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//       await User.sync()
//     })
//
//     describe('Testing GET userAccountData', () => {
//       beforeEach(async ()=>{
//         await User.build({
//           userName: 'User Test',
//           userEmail: 'user@test.test',
//           isAdmin: 0,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '$2b$10$RUir/Tjll6iNceGoa5UhG.I3UkR8Tqe1blLoMlB1GOaFYv8UwZiuS'
//         })
//         .save()
//       })
//       it('it should return status 200, userName="User Test", userEmail="user@test.test"', (done) => {
//         chai.request(server)
//           .get('/account')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(200)
//             res.body.userName.should.be.eql('User Test')
//             res.body.userEmail.should.be.eql('user@test.test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET userAccountData error handler', () => {
//       beforeEach(async ()=>{
//         await User.drop()
//       })
//       it('it should return status 500', (done) => {
//         chai.request(server)
//           .get('/account')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(500)
//             // res.body.userName.should.be.eql('User Test')
//             // res.body.userEmail.should.be.eql('user@test.test')
//             done()
//           })
//       })
//     })
//
//   })
//
//   // USER-HISTORY.CONTROLLER
//   describe('Testing user-history.controller', () => {
//     beforeEach(async ()=>{
//       await Order.drop()
//       await User.drop()
//       await Master.drop()
//       await City.drop()
//
//
//       await User.sync()
//       await City.sync()
//       await Master.sync()
//       await Order.sync()
//
//     })
//
//     describe('Testing GET userAccountData', () => {
//       beforeEach(async ()=>{
//         await City.build({ cityName: "Test" })
//         .save()
//         await Master.build({
//             masterName: 'Master Test',
//             masterRating: 5,
//             cityId: 1
//           })
//         .save()
//         await User.build({
//           userName: 'User Test',
//           userEmail: 'user@test.test',
//           isAdmin: 0,
//           isRegistered: 1,
//           regToken: '55494fb1d45b64c3810499224abe322f',
//           password: '$2b$10$RUir/Tjll6iNceGoa5UhG.I3UkR8Tqe1blLoMlB1GOaFYv8UwZiuS'
//         })
//         .save()
//
//         await Order.build({
//           cityId: 1,
//           masterId: 1,
//           userId: 1,
//           date: 1537822800000,
//           time: 12,
//           duration: 1
//         })
//         .save()
//       })
//       it('it should return status 200, userName="User Test", userEmail="user@test.test"', (done) => {
//         chai.request(server)
//           .get('/history')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(200)
//             // res.body.userName.should.be.eql('User Test')
//             // res.body.userEmail.should.be.eql('user@test.test')
//             done()
//           })
//       })
//     })
//
//     describe('Testing GET userAccountData error handler', () => {
//       beforeEach(async ()=>{
//         await Order.drop()
//         await User.drop()
//         await Master.drop()
//         await City.drop()
//       })
//       it('it should return status 500', (done) => {
//         chai.request(server)
//           .get('/history')
//           .set('Authorization', 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg')
//           .end((err, res) => {
//             // console.log(res.body)
//             res.should.have.status(500)
//             // res.body.userName.should.be.eql('User Test')
//             // res.body.userEmail.should.be.eql('user@test.test')
//             done()
//           })
//       })
//     })
//
//   })
//
//   after(async () => {
//     require('../index').shutdown()
//
//   })
// })
