const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

const Master = sequelize.define('master', { 
  masterName: {
    type: Sequelize.STRING
  },
  cityID: {
    type: Sequelize.SMALLINT
  },
  masterRating: {
    type: Sequelize.SMALLINT
  }
});

module.exports = Master;
