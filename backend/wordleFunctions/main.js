const logger = require('../utils/logger')
const tileParser = require('./parse')
const regexBuilder = require('./regex')
const wordleSimulator = require('./simulator')

const main = (word, guess) => {
  // const word = 'gnawn'
  const tiles = wordleSimulator(word, guess)
  const tilePositions = tileParser(tiles)
  const regex = regexBuilder(word, tilePositions)
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
