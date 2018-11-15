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

describe('TEST 005. Testing Auth0 web hook', () => {
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

  describe('Testing case when desired user is an admin ', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'Admin',
        userEmail: 'user@test.test',
        isAdmin: 1
      })
        .save()
    })
    it('should return status 200 and admin status', (done) => {
      chai.request(server)
        .post('/login/auth0hook')
        .send({
          user: {
            email: 'user@test.test',
            name: 'Admin'
          }
        })
        .end((err, res) => {
          // console.log('BODY', res.body)
          res.should.have.status(200)
          res.body.isAdmin.isAdmin.should.be.eql(1)
          done()
        })
    })
  })

  describe('Testing case when desired user is not an admin ', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'User',
        userEmail: 'user@test.test',
        isAdmin: 0
      })
        .save()
    })
    it('should return status 200 and user status', (done) => {
      chai.request(server)
        .post('/login/auth0hook')
        .send({
          user: {
            email: 'user@test.test',
            name: 'User'
          }
        })
        .end((err, res) => {
          // console.log('BODY', res.body)
          res.should.have.status(200)
          res.body.isAdmin.isAdmin.should.be.eql(0)
          done()
        })
    })
  })

  describe('Testing case when desired user is not in local DB', () => {
    it('should return status 200 and user status', (done) => {
      chai.request(server)
        .post('/login/auth0hook')
        .send({
          user: {
            email: 'user@test.test',
            name: 'User'
          }
        })
        .end((err, res) => {
          // console.log('BODY', res.body)
          res.should.have.status(200)
          res.body.isAdmin.isAdmin.should.be.eql(0)
          done()
        })
    })
  })

  describe('Testing Error handling', () => {
    beforeEach(async () => {
      await User.drop()
    })
    it('should return status 200 and user status', (done) => {
      chai.request(server)
        .post('/login/auth0hook')
        .send({
          user: {
            email: 'user@test.test',
            name: 'User'
          }
        })
        .end((err, res) => {
          // console.log('BODY', res.body)
          res.should.have.status(200)
          res.body.isAdmin.isAdmin.should.be.eql(0)
          done()
        })
    })
  })
})
