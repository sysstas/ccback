const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)
const Master = require('../models/master')
const City = require('../models/city')
const Order = require('../models/order')
const User = require('../models/user')

const TOKEN = 'some fake token'
let app, server
const sinon = require('sinon')
let auth = require('../services/checkAuth.service')
describe('', () => {
  sinon.stub(auth, 'checkAdminAuthorization')
    .callsFake((req, res, next) => {
      return next()
    })
  sinon.stub(auth, 'validateToken')
    .callsFake((req, res, next) => {
      let obj = {
        name: 'Admin',
        email: 'admin@example.com'
      }
      return obj;
    })
  app = require('../index')
  server = app.server
})
