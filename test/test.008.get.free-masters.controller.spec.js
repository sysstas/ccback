const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const server = app.server

const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

chai.should()
chai.use(chaiHttp)

// GET FREE MASTERS CONTROLLER
describe('TEST 008. Testing get.free-masters.controller', () => {
  beforeEach(async () => {
    await Order.drop()
    await User.drop()
    await Master.drop()
    await City.drop()

    await User.sync()
    await City.sync()
    await Master.sync()
    await Order.sync()
    await City.bulkCreate([
      { cityName: 'DNIPRO' },
      { cityName: 'LVIV' }
    ])

    await Master.bulkCreate([
      {
        masterName: 'MASTER_DNIPRO_1',
        masterRating: 1,
        cityId: 1
      },
      {
        masterName: 'MASTER_DNIPRO_2',
        masterRating: 2,
        cityId: 1
      },
      {
        masterName: 'MASTER_LVIV_1',
        masterRating: 3,
        cityId: 2
      },
      {
        masterName: 'MASTER_LVIV_2',
        masterRating: 4,
        cityId: 2
      }
    ])

    await User.build({
      userName: 'USER',
      userEmail: 'user@test.test',
      isAdmin: 0
    })
      .save()
  })

  // CASE 1
  describe('CASE 1. no orders in db', () => {
    //  ALL MASTERS ARE FREE
    describe('requesting masters from Dnipro, on specific date and time to repair small clock', () => {
      it('it should return only all masters from Dnipro', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 1,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(2)
            res.body[0].masterName.should.be.eql('MASTER_DNIPRO_1')
            res.body[0].ID.should.be.eql(1)
            res.body[1].masterName.should.be.eql('MASTER_DNIPRO_2')
            res.body[1].ID.should.be.eql(2)
            done()
          })
      })
    })

    // ALL MASTERS ARE FREE
    describe('requesting masters from Lviv, on specific date and time to repair small clock', () => {
      it('it should return only all masters from Lviv', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 2,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(2)
            res.body[0].masterName.should.be.eql('MASTER_LVIV_1')
            res.body[0].ID.should.be.eql(3)
            res.body[1].masterName.should.be.eql('MASTER_LVIV_2')
            res.body[1].ID.should.be.eql(4)
            done()
          })
      })
    })
  })

  // CASE 2
  describe('CASE 2. One order in db. Ordered first master from Dnipro on first day on noon to repair small clock', () => {
    beforeEach(async () => {
      await Order.build({
        date: 1,
        time: 12,
        duration: 1,
        cityId: 1,
        masterId: 1,
        clientId: 1
      })
        .save()
    })
    // 1 MASTER IS BUSY - ONLY ONE ORDER
    describe('requesting masters from Dnipro on same time and date with existing order', () => {
      it('it should return only all masters from Dnipro except the first one', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 1,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(1)
            res.body[0].masterName.should.be.eql('MASTER_DNIPRO_2')
            res.body[0].ID.should.be.eql(2)
            done()
          })
      })
    })

    //  1 MASTER IS BUSY - ONLY ONE ORDER
    describe('requesting masters from Lviv on same time and date with existing order', () => {
      it('it should return only all masters from Lviv', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 2,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(2)
            res.body[0].masterName.should.be.eql('MASTER_LVIV_1')
            res.body[0].ID.should.be.eql(3)
            res.body[1].masterName.should.be.eql('MASTER_LVIV_2')
            res.body[1].ID.should.be.eql(4)
            done()
          })
      })
    })
  })

  // CASE 3
  describe('CASE 3. Two orders in db. Ordered first master from Dnipro on first day and on the second day on noon to repair small clock', () => {
    beforeEach(async () => {
      await Order.bulkCreate([
        {
          date: 1,
          time: 12,
          duration: 1,
          cityId: 1,
          masterId: 1,
          clientId: 1
        },
        {
          date: 2,
          time: 12,
          duration: 1,
          cityId: 1,
          masterId: 1,
          clientId: 1
        }
      ])
    })
    // 1 MASTER IS BUSY - 2 ORDERs day by day
    describe('requesting masters from Dnipro on first day on noon for small clock', () => {
      it('it should return only all masters from Dnipro except the first one', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 1,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(1)
            res.body[0].masterName.should.be.eql('MASTER_DNIPRO_2')
            res.body[0].ID.should.be.eql(2)
            done()
          })
      })
    })

    //  1 MASTER IS BUSY - ONLY ONE ORDER
    describe('requesting masters from Dnipro on Lviv day on noon for small clock', () => {
      it('it should return only all masters from Lviv', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID: 2,
            date: 1,
            time: 12,
            duration: 1
          })
          .end((err, res) => {
            // console.log("TEST", res.body)
            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.length.should.be.eql(2)
            res.body[0].masterName.should.be.eql('MASTER_LVIV_1')
            res.body[0].ID.should.be.eql(3)
            res.body[1].masterName.should.be.eql('MASTER_LVIV_2')
            res.body[1].ID.should.be.eql(4)
            done()
          })
      })
    })
  })
  // CASE 4

  describe('Testing get.free-masters.controller error handler', () => {
    beforeEach(async () => {
      await Order.drop()
      await User.drop()
      await Master.drop()
      await City.drop()
    })
    it('it should return status 500', (done) => {
      chai.request(server)
        .post('/freemasters')
        .send({
          cityID: 1,
          date: 1,
          time: 12,
          duration: 1
        })
        .end((err, res) => {
          // console.log(res.body)
          res.should.have.status(500)
          done()
        })
    })
  })
  // after(async () => {
  //   require('../index').shutdown()
  // })
})
