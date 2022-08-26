const Word = require('../models/word')
const User = require('../models/user')
const Guess = require('../models/guess')
const logger = require('./logger')

const getWords = async () => {
  const record = await Word.findOne({})
  return record?.scraped
}

const saveUser = async (userId) => {
  const newUser = new User({ userId })
  await newUser.save()
  logger.info('user added')
}

const getPreviousGuesses = async (userId, name) => {
  const record = await Guess.findOne({ name, userId })
  return record?.guesses
}

const saveGuess = async (userId, name, prevGuesses, newGuess) => {
  if (prevGuesses) {
    const newGuesses = [...prevGuesses, newGuess]
    const newRecord = await Guess.findOneAndUpdate(
      { name, userId },
      { guesses: newGuesses },
      { new: true, runValidators: true, context: 'query' },
    )
    logger.info('new guess added', newRecord)
  } else {
    const newGuessObject = new Guess({
      name,
      guesses: [newGuess],
      userId,
    })
    const newRecord = await newGuessObject.save()
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
  getWords,
  saveUser,
  getPreviousGuesses,
  saveGuess,
}
