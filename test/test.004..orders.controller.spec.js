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

// ORDERS.CONTROLLER
describe('TEST 004. Testing orders.controller', () => {
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

  describe('Testing GET', () => {
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
        userName: 'User Testig Orders',
        userEmail: 'user@test.test',
        isAdmin: 1
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
    it('should GET all orders', (done) => {
      chai.request(server)
        .get('/orders')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          res.body[0].id.should.be.eql(1)
          res.body[0].time.should.be.eql(12)
          res.body[0].date.should.be.eql(1537822800000)
          res.body[0].duration.should.be.eql(1)
          res.body[0].city.cityName.should.be.eql('Test')
          res.body[0].master.masterName.should.be.eql('Master Test')
          res.body[0].user.userName.should.be.eql('User Testig Orders')
          res.body[0].user.userEmail.should.be.eql('user@test.test')
          done()
        })
    })
  })

  describe('Testing GET Error handler ', () => {
    beforeEach(async () => {
      await Order.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .get('/orders')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          if (err) {
            // console.log('ERROR', err)
          }
          res.should.have.status(500)
          done()
        })
    })
  })

  describe.skip('Testing POST', () => {
    beforeEach(async () => {
      await City.build({ cityName: 'TestingOrders' })
        .save()
      await Master.build({
        masterName: 'Master Testing Orders',
        masterRating: 5,
        cityId: 1
      })
        .save()
      await User.build({
        userName: 'User Testig Orders',
        userEmail: 'user@test.test',
        isAdmin: 1
      })
        .save()
    })
    it('should Create new order, return status 201 and necessary data', (done) => {
      chai.request(server)
        .post('/orders')
        .send({
          cityID: 1,
          masterID: 1,
          user: { id: 1 },
          date: 1537822800000,
          time: 12,
          duration: 1,
          userEmail: 'i@i'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          // console.log("TEST response",res.body)
          res.should.have.status(201)
          res.body.cityId.should.be.eql(1)
          res.body.userId.should.be.eql(1)
          res.body.date.should.be.eql(1537822800000)
          res.body.time.should.be.eql(12)
          res.body.duration.should.be.eql(1)
          done()
        })
    })
  })

  describe.skip('Testing POST Error handler ', () => {
    beforeEach(async () => {
      await Order.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .post('/orders')
        .send({
          cityId: 1,
          masterId: 1,
          user: { id: 1 },
          date: 1537822800000,
          time: 12,
          duration: 1,
          userEmail: 'i@i'
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
      await City.build({ cityName: 'Test' })
        .save()
      await Master.build({
        masterName: 'Master Test',
        masterRating: 5,
        cityId: 1
      })
        .save()
      await User.build({
        userName: 'User Testig Orders',
        userEmail: 'user@test.test',
        isAdmin: 1
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
    it('should delete order', (done) => {
      chai.request(server)
        .delete('/orders/1')
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
      await Order.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .delete('/orders/4')
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

  describe('Testing PayPal web hook', () => {
    beforeEach(async () => {
      await Order.drop()
    })
    it('should return 200', (done) => {
      chai.request(server)
        .post('/orders/paypalwebhook')
        .send({
          resource: {
            custom: 1111,
            parent_payment: 123123
          }
        })
        .end((err, res) => {
          if (err) {
            // console.log('ERROR', err)
          }
          res.should.have.status(200)
          done()
        })
    })
  })
})
