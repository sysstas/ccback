let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index')
let server = app.server
// let shotdown = app.shutdown

var Master = require('../models/master')
var City = require('../models/city')
var Order = require('../models/order')
var User = require('../models/user')

chai.should()
chai.use(chaiHttp)

describe('APP INTEGRATION', () => {


  // USERS.CONTROLLER
  describe('Testing users.controller', () => {
    beforeEach(async ()=>{
      await User.drop()
      await User.sync()
      await User.destroy({
        where: {},
        truncate: true
      })
    })

    describe('Testing GET initial data if isRegistered=0', () => {
      beforeEach(async ()=>{
        await User.build({
          userName: 'User Test',
          userEmail: 'user@test.test',
          isAdmin: 0,
          isRegistered: 0,
          regToken: '55494fb1d45b64c3810499224abe322f',
          password: '55494fb1d45b64c3810499224abe322f'
        })
        .save()
      })
      it('should return status 200, userName="User Test", userEmail="user@test.test", isRegistered="0"', (done) => {
        chai.request(server)
          .get('/register/55494fb1d45b64c3810499224abe322f')
          .end((err, res) => {
            if (err) {
              console.log("ERROR", err)
            }
            res.should.have.status(200)
            res.body.userName.should.be.eql('User Test')
            res.body.userEmail.should.be.eql('user@test.test')
            res.body.isRegistered.should.be.eql(0)
            done()
          })
      })
    })

    describe('Testing GET initial data if isRegistered=1', () => {
      beforeEach(async ()=>{
        await User.build({
          userName: 'User Test',
          userEmail: 'user@test.test',
          isAdmin: 0,
          isRegistered: 1,
          regToken: '55494fb1d45b64c3810499224abe322f',
          password: '55494fb1d45b64c3810499224abe322f'
        })
        .save()
      })
      it('should return status 200, isRegistered="1"', (done) => {
        chai.request(server)
          .get('/register/55494fb1d45b64c3810499224abe322f')
          .end((err, res) => {
            if (err) {
              console.log("ERROR", err)
            }
            res.should.have.status(200)
            res.body.isRegistered.should.be.eql(1)
            done()
          })
      })
    })

    describe('Testing GET initial data error handler', () => {
      beforeEach(async ()=>{
        await User.drop()
      })
      it('should return status 500', (done) => {
        chai.request(server)
          .get('/register/55494fb1d45b64c3810499224abe322f')
          .end((err, res) => {
            if (err) {
              console.log("ERROR", err)
            }
            res.should.have.status(500)
            done()
          })
      })
    })

    describe('Testing POST - registerUser', () => {
      beforeEach(async ()=>{
        await User.build({
          userName: 'User Test',
          userEmail: 'user@test.test',
          isAdmin: 0,
          isRegistered: 1,
          regToken: '55494fb1d45b64c3810499224abe322f',
        })
        .save()
      })
      it('should return status 200, id="1", userName="User Test", userEmail="user@test.test", isAdmin="0", isRegistered="1", regToken="55494fb1d45b64c3810499224abe322f", password is string', (done) => {
        chai.request(server)
          .post('/register')
          .send({
            password: 'pwd',
            email: 'user@test.test'
          })
          .end((err, res) => {
            if (err) {
              console.log("ERROR", err)
            }
            console.log("ERROR", res.body.password)
            res.should.have.status(200)
            res.body.id.should.be.eql(1)
            res.body.userName.should.be.eql('User Test')
            res.body.userEmail.should.be.eql('user@test.test')
            res.body.isAdmin.should.be.eql(0)
            res.body.isRegistered.should.be.eql(1)
            res.body.regToken.should.be.eql('55494fb1d45b64c3810499224abe322f')
            res.body.password.should.be.a('string')

            done()
          })
      })
    })

    describe('Testing POST - registerUser error handler', () => {
      beforeEach(async ()=>{
        await User.drop()
      })
      it('should return status 500', (done) => {
        chai.request(server)
          .post('/register')
          .send({
            password: 'pwd',
            email: 'user@test.test'
          })
          .end((err, res) => {
            if (err) {
              console.log("ERROR", err)
            }
            res.should.have.status(500)
            done()
          })
      })
    })

  })

})
