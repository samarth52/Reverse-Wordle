const express = require('express')
const cors = require('cors')
const wordleRouter = require('./routers/wordleRouter')
const middleware = require('./utils/middleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/wordle', wordleRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
