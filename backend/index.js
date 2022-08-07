const http = require('http')
const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`)
})
