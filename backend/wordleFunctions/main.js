const decoder = require('./decoder')
const regexBuilder = require('./regexBuilder')
const logger = require('../utils/logger')

const main = (emojiString) => {
  const word = 'unfit'
  const decoded = decoder(emojiString)
  const regex = regexBuilder(word, decoded)
  logger.info(regex)
}

// main('⬛⬛⬛⬛⬛')
main('🟨⬛🟨🟨⬛')
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main
