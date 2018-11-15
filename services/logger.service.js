
const winston = require('winston')

let logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV === 'test') {
  logger = winston.createLogger({
    silent: true
  })
}

module.exports = logger
