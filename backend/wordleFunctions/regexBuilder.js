const logger = require('../utils/logger')

const remainingLetters = (word, decoded, index) => {
  let letters = ''
  for (let i = 0; i < 5; i += 1) {
    if (i !== index && !decoded.green.includes(i) && !letters.includes(word[i])) {
      letters += word[i]
    }
  }
  return letters
}

const regexBuilder = (word, decoded) => {
  logger.info(word, decoded)
  const regexArray = ['', '', '', '', '']
  decoded.green.forEach((index) => {
    regexArray[index] = word[index]
  })
  decoded.black.forEach((index) => {
    regexArray[index] = '.'
  })
  decoded.yellow.forEach((index) => {
    regexArray[index] = `[${remainingLetters(word, decoded, index)}]`
  })
  return RegExp(regexArray.join(''))
}

module.exports = regexBuilder
