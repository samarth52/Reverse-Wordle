const logger = require('../utils/logger')

const remainingLetters = (answer, tilePositions, index) => {
  let letters = ''
  for (let i = 0; i < 5; i += 1) {
    if (i !== index && !tilePositions.green.includes(i) && !letters.includes(answer[i])) {
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
    regexArray[index] = `([${remainingLetters(answer, tilePositions, index)}])`
  })
  return RegExp(regexArray.join(''))
}

module.exports = regexBuilder
