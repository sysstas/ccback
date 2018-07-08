const Master = sequelize.define('master', { 
  cityName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
Master.sync({force: true}).then(() => {
  // Table created
  return Master.create({
    cityName: 'Dnipro'
  });
});

module.exports = Master;



// var mongoose = require('mongoose')

// module.exports = mongoose.model('Master', {    
//       name: String,
//       city: String,
//       rating: Number,
//       busy: Array 
// })