/* eslint-disable prefer-destructuring */
const logger = require('../utils/logger')

const MESSAGE_VALIDATION_REGEX = /^Wordle ([0-9]{3}) [1-6|X]\/6\*?\n\n(?:[byg]{5}\n?){1,6}$/
const CAPTURE_GUESSES_REGEX = /[byg]{5}/gm

const messageValidator = (message) => {
  const matches = MESSAGE_VALIDATION_REGEX.exec(message)
  logger.info('matches', matches)
  const result = {}
  if (matches === null) {
    result.success = false
    result.reason = 'ValidationError'
    result.message = 'Input is not of the format of the Wordle share message'
  } else {
    const guesses = message.match(CAPTURE_GUESSES_REGEX)
    logger.info('guesses', guesses)
    result.success = true
    result.day = Number.parseInt(matches[1], 10)
    result.guesses = guesses
  }
  return result
}

const remainingLetters = (answer, greenPositions, index) => {
  let letters = ''
  for (let i = 0; i < 5; i += 1) {
    if (i !== index && !greenPositions.includes(i) && !letters.includes(answer[i])) {
      letters += answer[i]
    }
  }
  return letters
}

const regexBuilder = (answer, tilePositions) => {
  logger.info(answer, tilePositions)
  const regexArray = ['', '', '', '', '']
  tilePositions.green.forEach((index) => {
    regexArray[index] = answer[index]
  })
  tilePositions.black.forEach((index) => {
    regexArray[index] = '.'
  })
  tilePositions.yellow.forEach((index) => {
    regexArray[index] = `[${remainingLetters(answer, tilePositions.green, index)}]`
  })
  return RegExp(regexArray.join(''))
}

module.exports = {
  messageValidator,
  regexBuilder,
}
