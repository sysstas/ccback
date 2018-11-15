const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)
const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

const app = require('../index')
const server = app.server
const TOKEN = 'some fake token'
// let app, server
// const sinon = require('sinon')
// let auth = require('../services/checkAuth.service')
// describe('', () => {
//   sinon.stub(auth, 'checkAdminAuthorization')
//     .callsFake((req, res, next) => {
//       return next()
//     })
//   app = require('../index')
//   server = app.server
// })

// CITIES.CONTROLLER
describe('TEST 001. Testing cities.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()
    await City.sync()
    await City.destroy({
      where: {},
      truncate: true
    })
  })


  describe('Testing GET cities', () => {
    beforeEach(async () => {
      await City.build({ cityName: 'Test' })
        .save()
    })
    it('should GET all cities', (done) => {
      chai.request(server)
        .get('/cities')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          res.body[0].cityName.should.be.eql('Test')
          done()
        })
    })
  })

  describe('Testing GET Error handler ', () => {
    beforeEach(async () => {
      await City.drop()
    })
    after(async () => {
      await City.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .get('/cities')
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
    it('should create city and return status 201 if user is Admin', (done) => {
      chai.request(server)
        .post('/cities')
        .set('Authorization', TOKEN)
        .send({
          'cityName': 'Test'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          res.should.have.status(201)
          done()
        })
    })
  })

  describe('Testing POST Error handler ', () => {
    beforeEach(async () => {
      await Master.drop()
      await City.drop()
    })
    after(async () => {
      await City.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .post('/cities')
        .set('Authorization', TOKEN)
        .send({
          'cityName': 'Test222'
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
    })
    it('should change city name and return status 200 if user is Admin', (done) => {
      chai.request(server)
        .put('/cities/1')
        .set('Authorization', TOKEN)
        .send({
          'cityName': 'TestChanged'
        })
        .end((err, res) => {
          if (err) {
            console.log('ERROR', err)
          }
          // console.log(res.body.cityName)
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Testing PUT Error handler ', () => {
    beforeEach(async () => {
      await City.drop()
    })
    after(async () => {
      await City.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .put('/cities/213')
        .set('Authorization', TOKEN)
        .send({
          'cityName': 'Test222'
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
    })
    it('should delete city and return status 204 if user is Admin', (done) => {
      chai.request(server)
        .delete('/cities/1')
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
      await City.drop()
    })
    after(async () => {
      await City.sync()
    })
    it('should return status 500', (done) => {
      chai.request(server)
        .delete('/cities/4')
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
