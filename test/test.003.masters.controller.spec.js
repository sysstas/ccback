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

describe('TEST 003. Testing masters.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()
    await City.sync()
    await Master.sync()
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
    })
    it('should GET all masters. ', (done) => {
      chai.request(server)
        .get('/masters')
        .set('Authorization', TOKEN)
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          res.body[0].masterName.should.be.eql('Master Test')
          done()
        })
    })
  })

  describe('Testing GET Error handler ', () => {
    beforeEach(async () => {
      await Master.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .get('/masters')
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
    beforeEach(async () => {
      await City.build({ cityName: 'Test' })
        .save()
    })
    it('should Create new master, return status 201 and necessary details', (done) => {
      chai.request(server)
        .post('/masters')
        .set('Authorization', TOKEN)
        .send({
          'masterName': 'Master Test',
          'masterRating': 5,
          'cityId': 1
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          // console.log(res.body)
          res.should.have.status(201)
          res.body.id.should.be.eql(1)
          res.body.masterName.should.be.eql('Master Test')
          res.body.cityId.should.be.eql(1)
          done()
        })
    })
  })

  describe('Testing POST Error handler ', () => {
    beforeEach(async () => {
      await Master.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .post('/masters')
        .set('Authorization', TOKEN)
        .send({
          'masterName': 'Master Test',
          'masterRating': 5,
          'cityId': 1
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
      await City.build({ cityName: 'Test' })
        .save()
      await Master.build({
        masterName: 'Master Test',
        masterRating: 5,
        cityId: 1
      })
        .save()
    })
    it('should change  master name and master rating and return status 200', (done) => {
      chai.request(server)
        .put('/masters/1')
        .set('Authorization', TOKEN)
        .send({
          'masterName': 'TestChanged',
          'masterRating': 2,
          'cityId': 1
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Testing PUT Error handler ', () => {
    beforeEach(async () => {
      await Master.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .put('/masters/213')
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
      await City.build({ cityName: 'Test' })
        .save()
      await Master.build({
        masterName: 'Master Test',
        masterRating: 5,
        cityId: 1
      })
        .save()
    })
    it('should delete master', (done) => {
      chai.request(server)
        .delete('/masters/1')
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
      await Master.drop()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .delete('/masters/4')
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
