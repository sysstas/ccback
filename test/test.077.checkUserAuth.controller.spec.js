// var chai = require('chai')
// var chaiAsPromised = require('chai-as-promised')
// var sinon = require('sinon')
//
// var MockExpressRequest = require('mock-express-request')
// var MockExpressResponse = require('mock-express-response')
//
// chai.use(chaiAsPromised)
// chai.should()
//
// var auth = require('../controllers/checkUserAuth.controller')
// var checkUserAuthenticated = auth.checkUserAuthenticated
// var verifyUserRegistration = auth.verifyUserRegistration
// // var tokenDecoding = auth.tokenDecoding
//
// describe('UNIT TESTS', () => {
//   describe('Testing function "verifyUserRegistration" in checkUserAuth.controller', () => {
//     describe('When isRegistered = 1', () => {
//       let credentials = {
//         isRegistered: 1
//       }
//       it('should return true ', () => {
//         verifyUserRegistration(credentials).should.be.true
//       })
//     })
//
//     describe('When isRegistered not equal 1 ', () => {
//       let credentials = {
//         isRegistered: 0
//       }
//       it('should return false ', () => {
//         verifyUserRegistration(credentials).should.be.false
//       })
//     })
//   })
//
//
// })
//
// describe('INTEGRATION TESTS', () => {
//   describe('Testing checkUserAuth.controller common behavier', () => {
//     describe('When request miss or have invalid "Authorization" header', () => {
//       describe('when header is invalid', () => {
//         let nextSpy = sinon.spy()
//         let resSpy = sinon.spy()
//
//         //making some tracking point to investigate if status code
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         let request = new MockExpressRequest()
//
//         checkUserAuthenticated(request, resSpy, nextSpy)
//         it('should not run next() ', () => {
//           nextSpy.calledOnce.should.be.false
//         })
//
//         it('should return  401 error status', () => {
//           resSpy.args[0].should.be.equal(401)
//         })
//       })
//     })
//
//     describe('When request have valid "Authorization" header', () => {
//       describe('when token is invalid', () => {
//         let nextSpy = sinon.spy()
//         let resSpy = sinon.spy()
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         let request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInsR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpc1JlZ2lcczdGVyZWQiOdjEsInJlZ1Rva2VuIjoiMTViNDQwNTA1OTE2N2Q1Yzc0YjRkZGI4MDc1ZmY3OTU2OTJkZjA4MTg3ODFjMjIxM2ZkYzAxYTMzOTc5ZGQzZSIsIklEIjoyLCJpYXQiOjE1MzY2NjU5MTZ9.-Q6KjZB4w0NlhEm_tFKQ5kn_7kh8H0ntGDHtRt8G-Q8'
//           }
//         })
//
//         checkUserAuthenticated(request, resSpy, nextSpy)
//         it('should not run next() ', () => {
//           nextSpy.calledOnce.should.be.false
//         })
//
//         it('should return  400 error status', () => {
//           resSpy.args[0].should.be.equal(400)
//         })
//       })
//
//       describe('when "isRegistered" = 1', () => {
//         let nextSpy = sinon.spy()
//         let response = new MockExpressResponse()
//         let request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg'
//           }
//         })
//
//         checkUserAuthenticated(request, response, nextSpy)
//         it('should run next() ', () => {
//           nextSpy.calledOnce.should.be.true
//         })
//       })
//
//       describe('when "isRegistered" = 0', () => {
//         let nextSpy = sinon.spy()
//         let resSpy = sinon.spy()
//
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         let request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpc1JlZ2lzdGVyZWQiOjAsInJlZ1Rva2VuIjoiMGUxNWFjZTU4OWY2NGU4ODU1YTI4ZjkxYjYyZTQ2MWMiLCJJRCI6MTQsImlhdCI6MTUzNzI4MDMwN30.qnsWAR6MI9KG4dv4W0HCSV8XKJA-VKW6iPg-nmh1RQ4'
//           }
//         })
//
//         checkUserAuthenticated(request, resSpy, nextSpy)
//         it('should not run next() ', () => {
//           nextSpy.calledOnce.should.be.false
//         })
//
//         it('should return  401 error status', () => {
//           resSpy.args[0].should.be.equal(401)
//         })
//       })
//     })
//   })
// })
