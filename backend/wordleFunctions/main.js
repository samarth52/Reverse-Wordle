const logger = require('../utils/logger')
const { messageParser, guessParser } = require('./parse')
const { regexBuilder } = require('./regex')
const { getPreviousGuesses, saveAttempt } = require('../utils/mongoFunctions')
const wordleSimulator = require('./simulator')
const webScraper = require('./webScraper')

const scraped = webScraper()

const filterWords = (words, firstGuess, answer, regex) => {
  const filteredWords = words.filter(
    (word) => regex.test(word) && wordleSimulator(word, answer) === firstGuess,
  )
  return filteredWords
}

const main = async (userId, name, shareMessage, guessTrial) => {
  const { answers } = await scraped
  let { words } = await scraped
  logger.info(words)

  const parsedMessage = messageParser(shareMessage)
  if (!parsedMessage.success) {
    return parsedMessage
  }
  const firstGuess = parsedMessage.guesses[0]

  const prevGuesses = await getPreviousGuesses(userId, name)
  logger.info('prevGuesses', prevGuesses)
  prevGuesses?.forEach((guess) => {
    words = filterWords(words, firstGuess, answers[guess[0]], guess[1])
  })
  logger.info('after prevGuess filtering', words)

  const answer = answers[parsedMessage.day]
  logger.info(answer)
  const tilePositions = guessParser(firstGuess)
  const filterRegex = regexBuilder(answer, tilePositions)
  logger.info(filterRegex)
  logger.info(filterRegex.test(guessTrial)) // temporary line to test function

  const filteredWords = filterWords(words, firstGuess, answer, filterRegex)
  logger.info(filteredWords)
  logger.info(filteredWords.includes(guessTrial)) // temporary line to test function
  await saveAttempt(userId, name, prevGuesses, parsedMessage.day, filterRegex)
  return {
    success: true,
    words: filteredWords,
  }
}

// main('⬛⬛⬛⬛⬛')
// main('🟨⬛🟨🟨⬛')
// main('gnawn', 'ginny')
// main('funny', 'union')
// main('unfit', 'unite')
// main('🟩⬛🟨🟨🟨')
// main('🟩🟩🟩🟩🟩')

module.exports = main
