const logger = require('../utils/logger')

const remainingLetters = (word, index) => {
  let letters = ''
  for (let i = 0; i < 5; i += 1) {
    if (i !== index) {
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

  let count = 0
  let temp = ''
  decoded.yellow.forEach((index) => {
    for (let i = 1; i <= count; i += 1) {
      temp += `(?!\\${i})`
      regexArray[index] = temp
    }
    regexArray[index] += `([${remainingLetters(word, index)}])`
    count += 1
  })
  return RegExp(regexArray.join(''))
}

module.exports = regexBuilder
