
const Sequelize = require('sequelize')
let sequelize

if (process.env.NODE_ENV === 'test') {
  console.log('############# SERVER CONNECTED TO', process.env.NODE_ENV, process.env.DB_CONFIG_TEST)
  sequelize = new Sequelize(process.env.DB_CONFIG_TEST, { logging: false })
} else if (process.env.NODE_ENV === 'dev') {
  console.log('############# SERVER CONNECTED TO', process.env.DB_CONFIG_DEV)
  sequelize = new Sequelize(process.env.DB_CONFIG_DEV, { logging: false })
} else {
  console.log('############# SERVER CONNECTED TO', process.env.DB_CONFIG_PROD)
  sequelize = new Sequelize(process.env.DB_CONFIG_PROD, { logging: false })
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
