const userRouter = require('express').Router()
const auth = require('../utils/firebaseConfig')
const logger = require('../utils/logger')
const User = require('../models/user')

userRouter.post('/signup', async (request, response) => {
  const { idToken } = request.body

  const decodedToken = await auth.verifyIdToken(idToken)
  logger.info(decodedToken)

  const newUser = new User({
    userId: decodedToken.user_id,
  })
  await newUser.save()
  logger.info('user added')

  response.status(200).json({ message: 'received' })
})

module.exports = userRouter
