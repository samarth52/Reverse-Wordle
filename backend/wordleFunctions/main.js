const logger = require('../utils/logger')
const { messageParser, guessParser } = require('./parse')
const { regexBuilder } = require('./regex')
const wordleSimulator = require('./simulator')
const webScraper = require('./webScraper')

const main = async (shareMessage, guess) => {
  // const word = 'gnawn'
  const parsedMessage = messageParser(shareMessage)
  if (!parsedMessage.success) {
    return parsedMessage
  }

  const scraped = await webScraper()
  const answer = scraped.answers[parsedMessage.day]
  logger.info(answer)
  const firstGuess = parsedMessage.guesses[0]
  const tilePositions = guessParser(firstGuess)
  const filterRegex = regexBuilder(answer, tilePositions)
  logger.info(filterRegex)
  logger.info(filterRegex.test(guess)) // temporary line to test function

  const { words } = scraped
  const filteredWords = words.filter(
    (word) => filterRegex.test(word) && wordleSimulator(word, answer) === firstGuess,
  )
  logger.info(filteredWords)
  logger.info(filteredWords.includes(guess)) // temporary line to test function
  return {
    success: true,
    words: filteredWords,
  }
}

// main('⬛⬛⬛⬛⬛')
// main('🟨⬛🟨🟨⬛')
// main('gnawn', 'ginny')
// main('funny', 'union')
main(`Wordle 429 4/6*

⬛⬛⬛🟨🟨
⬛🟨🟨⬛⬛
⬛🟩🟩🟩⬛
🟩🟩🟩🟩🟩`, 'soare')
// main('unfit', 'unite')
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main
