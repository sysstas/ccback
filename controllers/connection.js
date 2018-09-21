
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_CONFIG_TEST, { logging: false })
if (process.env.NODE_ENV) {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', process.env.NODE_ENV)
} else {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXyyyyyyyyyyyyyyyyyyyyyyyuuuuuuuuuuuuuuuuuuuuu')
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
