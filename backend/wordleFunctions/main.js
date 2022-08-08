const logger = require('../utils/logger')
const decoder = require('./decoder')
const regexBuilder = require('./regexBuilder')
const wordleSimulator = require('./wordleSimulator')

const main = (word, guess) => {
  // const word = 'gnawn'
  const emojiString = wordleSimulator(word, guess)
  const decoded = decoder(emojiString)
  const regex = regexBuilder(word, decoded)
  logger.info(regex)
  logger.info(regex.test(guess))
}

// main('⬛⬛⬛⬛⬛')
// main('🟨⬛🟨🟨⬛')
main('gnawn', 'ginny')
main('funny', 'union')
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main