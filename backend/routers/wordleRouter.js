const wordleRouter = require('express').Router()
const main = require('../wordleFunctions/main')

wordleRouter.post('/', async (request, response) => {
  const { shareMessage } = request.body
  await main('x7IQ2PButag7dzdCVfszSiOiXey1', 'Sam', shareMessage, 'soare')
  response.status(200).json({ message: 'received' })
})

module.exports = wordleRouter
