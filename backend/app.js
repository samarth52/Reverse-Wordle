const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/envConfig')
const userRouter = require('./routers/userRouter')
const wordleRouter = require('./routers/wordleRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('Connecting to MongoDB')
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info('MongoDB Connected!'))
  .catch((error) => logger.error(`Error connecting to MongoDB, ${error.message}`))

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/user', userRouter)
app.use('/api/wordle', wordleRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
