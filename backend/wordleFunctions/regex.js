const logger = require('../utils/logger')

const remainingLetters = (word, tilePositions, index) => {
  let letters = ''
  for (let i = 0; i < 5; i += 1) {
    if (i !== index && !tilePositions.green.includes(i) && !letters.includes(word[i])) {
      letters += word[i]
    }
  }
  return letters
}

const regexBuilder = (word, tilePositions) => {
  logger.info(word, tilePositions)
  const regexArray = ['', '', '', '', '']
  tilePositions.green.forEach((index) => {
    regexArray[index] = word[index]
  })
  tilePositions.black.forEach((index) => {
    regexArray[index] = '.'
  })
  tilePositions.yellow.forEach((index) => {
    regexArray[index] = `([${remainingLetters(word, tilePositions, index)}])`
  })
  return RegExp(regexArray.join(''))
}

module.exports = regexBuilder
