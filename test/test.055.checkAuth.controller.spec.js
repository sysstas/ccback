// const chai = require('chai')
// const chaiAsPromised = require('chai-as-promised')
// const sinon = require('sinon')
//
// const MockExpressRequest = require('mock-express-request')
// const MockExpressResponse = require('mock-express-response')
//
// chai.use(chaiAsPromised)
// chai.should()
//
// const auth = require('../services/checkAuth.service')
// const checkAuthenticated = auth.checkAuthenticated
// const verifyAdmin = auth.verifyAdmin
// const tokenDecoding = auth.tokenDecoding
//
// describe('UNIT TESTS', () => {
//   describe('Testing function "verifyAdmin" in checkAuth.controller', () => {
//     describe('When isAdmin = 1', () => {
//       const credentials = {
//         isAdmin: 1
//       }
//
//       it('should return true ', () => {
//         verifyAdmin(credentials).should.be.true
//       })
//     })
//
//     describe('When isAdmin not equal 1 ', () => {
//       const credentials = {
//         isAdmin: 0
//       }
//
//       it('should return false ', () => {
//         verifyAdmin(credentials).should.be.false
//       })
//     })
//   })
//
//   describe('Testing function "tokenDecoding" in checkAuth.controller', () => {
//     describe('When token is valid', () => {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg'
//
//       it('should return payload object', () => {
//         tokenDecoding(token).should.be.an('object')
//       })
//     })
//
//     describe('When token is invalid', () => {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IdkpXVCJ9.eyJpc0FkbsdfsdWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg'
//
//       it('should return false ', () => {
//         tokenDecoding(token).should.be.false
//       })
//     })
//   })
// })
//
// describe('INTEGRATION TESTS', () => {
//   describe('Testing checkAuth.controller common behavier', () => {
//     describe('When request miss or have invalid "Authorization" header', () => {
//       describe('when header is invalid', () => {
//         const nextSpy = sinon.spy()
//         const resSpy = sinon.spy()
//
//         // making some tracking point to investigate if status code
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         const request = new MockExpressRequest()
//
//         checkAuthenticated(request, resSpy, nextSpy)
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
//         const nextSpy = sinon.spy()
//         const resSpy = sinon.spy()
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         const request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInsR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpc1JlZ2lcczdGVyZWQiOdjEsInJlZ1Rva2VuIjoiMTViNDQwNTA1OTE2N2Q1Yzc0YjRkZGI4MDc1ZmY3OTU2OTJkZjA4MTg3ODFjMjIxM2ZkYzAxYTMzOTc5ZGQzZSIsIklEIjoyLCJpYXQiOjE1MzY2NjU5MTZ9.-Q6KjZB4w0NlhEm_tFKQ5kn_7kh8H0ntGDHtRt8G-Q8'
//           }
//         })
//
//         checkAuthenticated(request, resSpy, nextSpy)
//         it('should not run next() ', () => {
//           nextSpy.calledOnce.should.be.false
//         })
//
//         it('should return  400 error status', () => {
//           resSpy.args[0].should.be.equal(400)
//         })
//       })
//
//       describe('when "isAdmin" = 1', () => {
//         const nextSpy = sinon.spy()
//         const response = new MockExpressResponse()
//         const request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMSIsIklEIjoxLCJpYXQiOjE1MzY1ODc5NTJ9.F29kjcSrROmPoZGDmUsBPVObtA81XYU-d2fh_cTWzOg'
//           }
//         })
//
//         checkAuthenticated(request, response, nextSpy)
//         it('should run next() ', () => {
//           nextSpy.calledOnce.should.be.true
//         })
//       })
//
//       describe('when "isAdmin" = 0', () => {
//         const nextSpy = sinon.spy()
//         const resSpy = sinon.spy()
//
//         resSpy.sendStatus = function (num) { this.args.push(num) }
//         const request = new MockExpressRequest({
//           headers: {
//             'Authorization': 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpc1JlZ2lzdGVyZWQiOjEsInJlZ1Rva2VuIjoiMTViNDQwNTA1OTE2N2Q1Yzc0YjRkZGI4MDc1ZmY3OTU2OTJkZjA4MTg3ODFjMjIxM2ZkYzAxYTMzOTc5ZGQzZSIsIklEIjoyLCJpYXQiOjE1MzY2NjU5MTZ9.-Q6KjZB4w0NlhEm_tFKQ5kn_7kh8H0ntGDHtRt8G-Q8'
//           }
//         })
//
//         checkAuthenticated(request, resSpy, nextSpy)
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
//
