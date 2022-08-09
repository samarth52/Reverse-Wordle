const logger = require('../utils/logger')
const tileParser = require('./parse')
const regexBuilder = require('./regex')
const wordleSimulator = require('./simulator')
const webScraper = require('./webScraper')

const main = async (answer, guess) => {
  // const word = 'gnawn'
  const tiles = wordleSimulator(answer, guess)
  const tilePositions = tileParser(tiles)
  const regex = regexBuilder(answer, tilePositions)
  logger.info(regex)
  logger.info(regex.test(guess))

  const { words } = await webScraper()
  const filtered = words.filter(
    (word) => regex.test(word) && wordleSimulator(answer, word) === tiles,
  )
  logger.info(filtered)
  logger.info(filtered.includes(guess))
}

// main('⬛⬛⬛⬛⬛')
// main('🟨⬛🟨🟨⬛')
// main('gnawn', 'ginny')
main('funny', 'union')
// main('unfit', 'unite')
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main
