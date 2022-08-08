// const logger = require('../utils/logger')

const wordleSimulator = (word, guess) => {
  // logger.info(word, guess)
  const letters = {} // holds characters and their indices that correspond to yellow and black tiles
  const guessEmoji = ['⬛', '⬛', '⬛', '⬛', '⬛'] // array respresenting the conversion of the guess into colored tiles
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === word[i]) {
      guessEmoji[i] = '🟩'
    } else if (word[i] in letters) {
      letters[word[i]].push(i)
    } else {
      letters[word[i]] = [i]
    }
  }
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] in letters && letters[guess[i]].length !== 0) {
      guessEmoji[i] = '🟨'
      letters[guess[i]].shift() // removes first element of letters[guess[i]]
    }
  }

  const toReturn = guessEmoji.join('')
  // logger.info(toReturn)
  return toReturn
}

module.exports = wordleSimulator
