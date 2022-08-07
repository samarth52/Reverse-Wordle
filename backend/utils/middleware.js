const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path  :', request.path)
  if (request.method !== 'GET') {
    logger.info('Body  :', request.body)
  }
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  logger.info('unknown endpoint:', request.path)
  response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
}
