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
  const result = messageValidator(convertedMessage)
  return result
}

const guessParser = (tiles) => {
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
  return tilePositions
}

module.exports = {
  messageParser,
  guessParser,
}
