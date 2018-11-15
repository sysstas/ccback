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

describe('TEST 007. Testing user-history.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()

    await User.sync()
    await City.sync()
    await Master.sync()
    await Order.sync()
  })

  describe('Testing GET userAccountData', () => {
    beforeEach(async () => {
      await City.build({ cityName: 'Test' })
        .save()
      await Master.build({
        masterName: 'Master Test',
        masterRating: 5,
        cityId: 1
      })
        .save()
      await User.build({
        userName: 'Admin',
        userEmail: 'admin@example.com',
        isAdmin: 0
      })
        .save()

      await Order.build({
        cityId: 1,
        masterId: 1,
        userId: 1,
        date: 1537822800000,
        time: 12,
        duration: 1
      })
        .save()
    })
    it('it should return status 200 and order history data', (done) => {
      chai.request(server)
        .get('/history')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body[0].should.have.property('city').which.is.an('object')
          res.body[0].should.have.property('master').which.is.an('object')
          res.body[0].should.have.property('user').which.is.an('object')
          done()
        })
    })
  })

  describe('Testing GET userAccountData error handler', () => {
    beforeEach(async () => {
      await Order.drop()
      await User.drop()
      await Master.drop()
      await City.drop()
    })
    it('it should return status 500', (done) => {
      chai.request(server)
        .get('/history')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(500)
          // res.body.userName.should.be.eql('User Test')
          // res.body.userEmail.should.be.eql('user@test.test')
          done()
        })
    })
  })
})
