const chai = require('chai')
const chaiHttp = require('chai-http')
const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')
require('dotenv').config()
const TOKEN = require('./CONFIG')
chai.should()
chai.use(chaiHttp)
const app = require('../index')
const server = app.server

describe('TEST 006. Testing user-account.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()
    await User.sync()
  })

  describe('Testing GET user account data', () => {
    beforeEach(async () => {
      await User.build({
        userName: 'Admin',
        userEmail: 'admin@example.com',
        isAdmin: 0
      })
        .save()
    })
    it('it should return status 200 and user data', (done) => {
      chai.request(server)
        .get('/account')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(200)
          res.body.userName.should.be.eql('Admin')
          res.body.userEmail.should.be.eql('admin@example.com')
          done()
        })
    })
  })

  describe('Testing GET userAccountData error handler', () => {
    beforeEach(async () => {
      await User.drop()
    })
    it('it should return status 500', (done) => {
      chai.request(server)
        .get('/account')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(404)
          // res.body.userName.should.be.eql('User Test')
          // res.body.userEmail.should.be.eql('user@test.test')
          done()
        })
    })
  })
})
