
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.combine(
      winston.format.colorize({ level: true }),
      winston.format.simple()
    ) }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

module.exports = logger
