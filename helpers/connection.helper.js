
const Sequelize = require('sequelize')
let sequelize
const logger = require('../services/logger.service')

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(process.env.DB_CONFIG_TEST, { logging: false })
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_TEST}`)
  logger.info(`Test env`)
}

if (process.env.NODE_ENV === 'dev') {
  sequelize = new Sequelize(process.env.DB_CONFIG_DEV, { logging: false })
  // sequelize = new Sequelize(process.env.DB_CONFIG_DEV, { logging: true })
  logger.info(`Dev env`)
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_DEV}`)
} else {
  logger.info(`CONNECTED TO ${process.env.DB_CONFIG_PROD}`)
  sequelize = new Sequelize(process.env.DB_CONFIG_PROD, { logging: false })
  logger.info(`Dev env`)
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
