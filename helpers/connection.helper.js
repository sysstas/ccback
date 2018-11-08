
const Sequelize = require('sequelize')
let sequelize
const logger = require('../services/logger.service')

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(process.env.DB_CONFIG_TEST, { logging: false })
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_TEST}`)
}

if (process.env.NODE_ENV === 'dev') {
  sequelize = new Sequelize(process.env.DB_CONFIG_DEV, { logging: false })
  // sequelize = new Sequelize(process.env.DB_CONFIG_DEV, { logging: true })
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_DEV}`)
} else {
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_PROD}`)
  sequelize = new Sequelize(process.env.DB_CONFIG_PROD, { logging: false })
}

sequelize
  .authenticate()
  .then(() => {
    logger.info(`Connection has been established successfully`)
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`)
  })

module.exports = sequelize
