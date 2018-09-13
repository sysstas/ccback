//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let server = app.server
let shotdown = app.shutdown
chai.should();


chai.use(chaiHttp);
//Our parent block
describe('APP INTEGRATION', () => {
  
  describe('Testing cities.controller', () => {

    describe('/GET book', () => {

        it('should GET all cities', (done) => {
          chai.request(server)
              .get('/cities')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                shotdown()
                done();
              });
        });
    });
    
    after(async ()=>{
      require('../index').shutdown()
    })

  })
  


});