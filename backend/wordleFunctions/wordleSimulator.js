// const logger = require('../utils/logger')

const wordleSimulator = (word, guess) => {
  // logger.info(word, guess)
  const letters = {}
  for (let i = 0; i < 5; i += 1) {
    if (word[i] in letters) {
      letters[word[i]].push(i)
    } else {
      letters[word[i]] = [i]
    }
  }

  const guessEmoji = ['⬛', '⬛', '⬛', '⬛', '⬛']
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === word[i]) {
      guessEmoji[i] = '🟩'
      letters[word[i]] = letters[word[i]].filter((index) => index !== i)
    }
  }
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] in letters && guessEmoji[i] !== '🟩' && letters[guess[i]].length !== 0) {
      guessEmoji[i] = '🟨'
      letters[word[i]] = letters[guess[i]].filter((index) => index !== i)
    }
  }

  const toReturn = guessEmoji.join('')
  // logger.info(toReturn)
  return toReturn
}

module.exports = wordleSimulator
