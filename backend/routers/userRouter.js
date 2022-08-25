const userRouter = require('express').Router()
const auth = require('../utils/firebaseConfig')
const logger = require('../utils/logger')
const { saveUser } = require('../utils/mongoFunctions')

userRouter.post('/signup', async (request, response) => {
  const { idToken } = request.body

  const decodedToken = await auth.verifyIdToken(idToken)
  logger.info(decodedToken)
  await saveUser(decodedToken.user_id)

  response.status(200).json({ message: 'user saved' })
})

module.exports = userRouter
