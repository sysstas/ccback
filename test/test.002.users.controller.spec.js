const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const server = app.server
const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')
require('dotenv').config()
const TOKEN = require('./CONFIG')
chai.should()
chai.use(chaiHttp)

describe('TEST 002. Testing users.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()
    await User.sync()
    await User.destroy({
      where: {},
      truncate: true
    })
  })

  describe('Testing GET', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'User Test',
        userEmail: 'user@test.test',
        isAdmin: 0
      })
        .save()
    })
    it('should GET all users', (done) => {
      chai.request(server)
        .get('/users')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          res.body[0].userName.should.be.eql('User Test')
          done()
        })
    })
  })

  describe('Testing GET Error handler ', () => {
    beforeEach(async () => {
      await User.drop()
    })
    after(async () => {
      await User.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .get('/users')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('Testing POST', () => {
    it('should Create new user, return status 201 and return necessary details', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          'userName': 'User Test',
          'userEmail': 'user@test.test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(201)
          res.body.id.should.be.eql(1)
          res.body.isAdmin.should.be.eql(0)
          done()
        })
    })
  })

  describe('Testing POST if user already exist in DB', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'User Test',
        userEmail: 'user@test.test',
        isAdmin: 1
      })
        .save()
    })
    it('should return status 201 and necessary details', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          'userName': 'User Test',
          'userEmail': 'user@test.test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(201)
          res.body.id.should.be.eql(1)
          res.body.isAdmin.should.be.eql(1)
          done()
        })
    })
  })

  describe('Testing POST Error handler ', () => {
    beforeEach(async () => {
      await User.drop()
    })
    after(async () => {
      await User.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .post('/users')
        .set('Authorization', TOKEN)
        .send({
          'userName': 'User Test',
          'userEmail': 'user@test.test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('Testing PUT', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'User Test',
        userEmail: 'user@test.test',
        isAdmin: 0
      })
        .save()
    })
    it('should change user name, email and return status 200, and necessary details if admin request', (done) => {
      chai.request(server)
        .put('/users/1')
        .set('Authorization', TOKEN)
        .send({
          userName: 'TestChanged',
          userEmail: 'TestChanged@test.test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(200)
          res.body.userName.should.be.eql('TestChanged')
          res.body.userEmail.should.be.eql('TestChanged@test.test')
          done()
        })
    })
  })

  describe('Testing PUT Error handler ', () => {
    beforeEach(async () => {
      await User.drop()
    })
    after(async () => {
      await User.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .put('/users/213')
        .set('Authorization', TOKEN)
        .send({
          userName: 'TestChanged',
          userEmail: 'TestChanged@test.test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('Testing DELETE', () => {
    beforeEach(async () => {
      await User.build({ cityName: 'Test' })
        .save()
    })
    it('should delete element with id=1 and return status 204 if user Authenticated as Admin', (done) => {
      chai.request(server)
        .delete('/users/1')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(204)
          // console.log(res.body)
          done()
        })
    })
  })

  describe('Testing DELETE Error handler ', () => {
    beforeEach(async () => {
      await User.drop()
    })
    after(async () => {
      await User.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .delete('/users/4')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(500)
          done()
        })
    })
  })
})
