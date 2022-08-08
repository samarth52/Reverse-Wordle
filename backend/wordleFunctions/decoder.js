const logger = require('../utils/logger')

const decoder = (emojiString) => {
  const decoded = {
    string: '',
    green: [],
    yellow: [],
    black: [],
  }
  Array.from(emojiString).forEach((emoji, i) => {
    if (emoji === '🟩') {
      decoded.string += 'g'
      decoded.green.push(i)
    } else if (emoji === '🟨') {
      decoded.string += 'y'
      decoded.yellow.push(i)
    } else {
      decoded.string += 'b'
      decoded.black.push(i)
    }
  })
  logger.info(emojiString, decoded)
  return decoded
}

module.exports = decoder
