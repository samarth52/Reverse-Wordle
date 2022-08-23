const logger = require('../utils/logger')
const { messageValidator } = require('./regex')

const messageParser = (message) => {
  const convertedArray = []
  Array.from(message).forEach((char) => {
    if (char === '🟩') {
      convertedArray.push('g')
    } else if (char === '🟨') {
      convertedArray.push('y')
    } else if (char === '⬛' || char === '⬜') {
      convertedArray.push('b')
    } else {
      convertedArray.push(char)
    }
  })

  const convertedMessage = convertedArray.join('')
  logger.info(convertedMessage)
  const result = messageValidator(convertedMessage)
  logger.info(result)
  return result
}

const tileParser = (tiles) => {
  const tilePositions = {
    green: [],
    yellow: [],
    black: [],
  }
  Array.from(tiles).forEach((emoji, i) => {
    if (emoji === 'g') {
      tilePositions.green.push(i)
    } else if (emoji === 'y') {
      tilePositions.yellow.push(i)
    } else {
      tilePositions.black.push(i)
    }
  })
  logger.info(tiles, tilePositions)
  return tilePositions
}

module.exports = {
  messageParser,
  tileParser,
}

messageParser(`Wordle 429 4/6*

⬛⬛⬛🟨🟨
⬛🟨🟨⬛⬛
⬛🟩🟩🟩⬛
🟩🟩🟩🟩🟩`)
