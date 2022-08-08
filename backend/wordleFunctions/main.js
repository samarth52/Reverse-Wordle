const logger = require('../utils/logger')
const decoder = require('./decoder')
const regexBuilder = require('./regexBuilder')
const wordleSimulator = require('./wordleSimulator')

const main = (emojiString) => {
  const word = 'gnawn'
  const decoded = decoder(emojiString)
  const regex = regexBuilder(word, decoded)
  logger.info(regex)
  logger.info(regex.test('ginny'))
}

// main('⬛⬛⬛⬛⬛')
// main('🟨⬛🟨🟨⬛')
main(wordleSimulator('gnawn', 'ginny'))
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main
