const wordleRouter = require('express').Router()

wordleRouter.get('/', (request, response) => {
  response.status(200).json({ message: 'received' })
})

module.exports = wordleRouter
