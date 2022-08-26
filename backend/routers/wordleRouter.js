const wordleRouter = require('express').Router()
const main = require('../wordleFunctions/main')
const decodeIdToken = require('../utils/firebaseConfig')
const { removeGuesses } = require('../utils/mongoFunctions')

wordleRouter.post('/', async (request, response) => {
  const { idToken, name, shareMessage } = request.body
  const userId = await decodeIdToken(idToken)
  await main(userId, name, shareMessage, 'soare')
  response.status(200).json({ message: 'received' })
})

wordleRouter.post('/deleteAll', async (request, response) => {
  const { idToken, name } = request.body
  const userId = await decodeIdToken(idToken)
  await removeGuesses(userId, name)
  response.status(200).json({ message: 'completed' })
})

module.exports = wordleRouter
