
const Sequelize = require('sequelize')
let sequelize

if (process.env.NODE_ENV) {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', process.env.NODE_ENV, process.env.DB_CONFIG_TEST)
  sequelize = new Sequelize(process.env.DB_CONFIG_TEST, { logging: false })
} else {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXyyyyyyyyyyyyyyyyyyyyyyyuuuuuuuuuuuuuuuuuuuuu', process.env.DB_CONFIG_PROD)
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
