const logger = require('../utils/logger')
const { messageParser, guessParser } = require('./parse')
const { regexBuilder } = require('./regex')
const { getPreviousGuesses, saveGuess } = require('../utils/mongoFunctions')
const wordleSimulator = require('./simulator')
const wordsRanker = require('./webScraper')

const scraped = wordsRanker()

const filterWords = (words, guess) => {
  const [answer, regex, firstGuess] = guess
  logger.info('before filtering:', words, 'answer:', answer, 'regex:', regex, 'firstGuess:', firstGuess)
  const filteredWords = words.filter(
    (word) => regex.test(word) && wordleSimulator(word, answer) === firstGuess,
  )
  return filteredWords
}

const main = async (userId, name, shareMessage, guessTrial) => {
  const { answers } = await scraped
  let { words } = await scraped
  logger.info(words)
  logger.info('soare included?', words.includes('soare'))
  logger.info('soare index (if included)?', words?.indexOf('soare'))

  const parsedMessage = messageParser(shareMessage)
  if (!parsedMessage.success) {
    return parsedMessage
  }
  const firstGuess = parsedMessage.guesses[0]
  logger.info('firstGuess tiles:', firstGuess)

  const prevGuesses = await getPreviousGuesses(userId, name)
  logger.info('prevGuesses', prevGuesses)
  prevGuesses?.forEach((guess) => {
    words = filterWords(words, guess)
    logger.info('filtering with:', guess, '| words:', words)
  })
  // logger.info('after prevGuess filtering', words)

  const answer = answers[parsedMessage.day]
  logger.info('answer', answer)
  const tilePositions = guessParser(firstGuess)
  const filterRegex = regexBuilder(answer, tilePositions)
  // logger.info(filterRegex)
  logger.info('check soare with filter:', filterRegex.test(guessTrial)) // temporary line to test function

  const newGuess = [answer, filterRegex, firstGuess]

  const filteredWords = filterWords(words, newGuess)
  logger.info(filteredWords)
  logger.info(filteredWords.includes(guessTrial)) // temporary line to test function

  logger.info('best word:', filteredWords[0])

  await saveGuess(userId, name, prevGuesses, newGuess)
  return {
    success: true,
    bestFirstWord: filteredWords[0],
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
