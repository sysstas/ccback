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

  // GET FREE MASTERS CONTROLLER
  describe('Testing get.free-masters.controller', () => {


    describe('intial data: CITIES: DNIPRO, LVIV; MASTERS: 2 masters in each city', () => {
      beforeEach(async ()=>{
        await Order.drop()
        await User.drop()
        await Master.drop()
        await City.drop()


        await User.sync()
        await City.sync()
        await Master.sync()
        await Order.sync()
        await City.bulkCreate([
          { cityName: "DNIPRO" },
          { cityName: "LVIV" }
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
          isAdmin: 0,
          isRegistered: 1,
          regToken: '55494fb1d45b64c3810499224abe322f',
          password: '$2b$10$RUir/Tjll6iNceGoa5UhG.I3UkR8Tqe1blLoMlB1GOaFYv8UwZiuS'
        })
        .save()
      })

      // CASE 1
      describe('CASE 1. ORDERS: none', () => {

        //  ALL MASTERS ARE FREE
        describe('requesting city:DNIPRO, date:1, time:12, duration:1', () =>{
          it('it should return 200, array of 2, masters: MASTER_DNIPRO_1, MASTER_DNIPRO_2', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:1,
                date:1,
                time:12,
                duration:1
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
        describe('requesting city:LVIV, date:1, time:12, duration:1', () =>{
          it('it should return 200, array of 2, masters: MASTER_LVIV_1, MASTER_LVIV_1', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:2,
                date:1,
                time:12,
                duration:1
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
      describe('CASE 2. ORDERS: [{DNIPRO, data:1, time:12, duration:1, MASTER_DNIPRO_1 (1)}]', () => {
        beforeEach( async () => {
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
        describe('requesting city:DNIPRO, date:1, time:12, duration:1 - same time with existing order', () =>{

          it('it should return 200, array of 1, masters: MASTER_DNIPRO_2', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:1,
                date:1,
                time:12,
                duration:1
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
        describe('requesting city:LVIV, date:1, time:12, duration:1', () =>{
          it('it should return 200, array of 2, masters: MASTER_LVIV_1, MASTER_LVIV_1', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:2,
                date:1,
                time:12,
                duration:1
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
      describe('CASE 3. ORDERS: [{DNIPRO, data:1, time:12, duration:1, MASTER_DNIPRO_1 (1)}, {DNIPRO, data:2, time:12, duration:1, MASTER_DNIPRO_1 (1)}]', () => {
        beforeEach( async () => {
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
            },
          ])
        })
        // 1 MASTER IS BUSY - 2 ORDERs day by day
        describe('requesting city:DNIPRO, date:1, time:12, duration:1 - same time with existing order', () =>{

          it('it should return 200, array of 1, masters: MASTER_DNIPRO_2', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:1,
                date:1,
                time:12,
                duration:1
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
        describe('requesting city:LVIV, date:1, time:12, duration:1', () =>{
          it('it should return 200, array of 2, masters: MASTER_LVIV_1, MASTER_LVIV_1', (done) => {
            chai.request(server)
              .post('/freemasters')
              .send({
                cityID:2,
                date:1,
                time:12,
                duration:1
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


    })


    describe('Testing get.free-masters.controller error handler', () => {
      beforeEach(async ()=>{
        await Order.drop()
        await User.drop()
        await Master.drop()
        await City.drop()
      })
      it('it should return status 500', (done) => {
        chai.request(server)
          .post('/freemasters')
          .send({
            cityID:1,
            date:1,
            time:12,
            duration:1
          })
          .end((err, res) => {
            // console.log(res.body)
            res.should.have.status(500)
            done()
          })
      })
    })

  })
