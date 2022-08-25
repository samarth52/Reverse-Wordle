const Guess = require('../models/guess')
const logger = require('./logger')

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
  }
}

module.exports = {
  getPreviousGuesses,
  saveAttempt,
}
