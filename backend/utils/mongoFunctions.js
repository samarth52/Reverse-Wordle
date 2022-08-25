const User = require('../models/user')
const Guess = require('../models/guess')
const logger = require('./logger')

const saveUser = async (userId) => {
  const newUser = new User({ userId })
  await newUser.save()
  logger.info('user added')
}

const getPreviousGuesses = async (userId, name) => {
  const record = await Guess.findOne({ name, userId })
  logger.info('records', record)
  return record?.guesses
}

const saveAttempt = async (userId, name, prevGuesses, day, regex) => {
  const newAttempt = [day, regex]
  if (prevGuesses) {
    const newGuesses = [...prevGuesses, newAttempt]
    const newRecord = await Guess.findOneAndUpdate(
      { name, userId },
      { guesses: newGuesses },
      { new: true, runValidators: true, context: 'query' },
    )
    logger.info('new guess added', newRecord)
  } else {
    const newGuess = new Guess({
      name,
      guesses: [newAttempt],
      userId,
    })
    const newRecord = await newGuess.save()
    logger.info('new guess saved', newRecord)
    const user = await User.findOne({ userId })
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { guesses: [...user.guesses, newRecord.id] },
      { new: true, runValidators: true, context: 'query' },
    )
    logger.info('corresponding user', updatedUser)
  }
}

module.exports = {
  saveUser,
  getPreviousGuesses,
  saveAttempt,
}
