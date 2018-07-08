const Sequelize = require('sequelize')
var sequelize = require('../controllers/connection')

// const City = sequelize.define('city', { 
//   cityName: {
//     type: Sequelize.STRING
//   }
// });

const City = sequelize.define('city', {
  ID: {
    type: Sequelize.SMALLINT
  },
  cityName: {
    type: Sequelize.STRING
  }
})

// force: true will drop the table if it already exists
// City.sync({force: true}).then(() => {
//   // Table created
//   return City.create({
//     cityName: 'Dnipro'
//   });
// });

module.exports = City;
