const userRouter = require('express').Router()
const decodeIdToken = require('../utils/firebaseConfig')
const { saveUser } = require('../utils/mongoFunctions')

userRouter.post('/signup', async (request, response) => {
  const { idToken } = request.body

  const userId = await decodeIdToken(idToken)
  await saveUser(userId)

  response.status(200).json({ message: 'user saved' })
})

module.exports = userRouter
