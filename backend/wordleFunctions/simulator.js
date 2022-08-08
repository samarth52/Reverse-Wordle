// const logger = require('../utils/logger')

const simulator = (answer, guess) => {
  // logger.info(answer, guess)
  const letters = {} // holds characters and their indices that correspond to yellow and black tiles
  const tiles = ['⬛', '⬛', '⬛', '⬛', '⬛'] // array respresenting the conversion of the guess into colored tiles
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === answer[i]) {
      tiles[i] = '🟩'
    } else if (answer[i] in letters) {
      letters[answer[i]].push(i)
    } else {
      letters[answer[i]] = [i]
    }
  }
  // logger.info(letters)
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] in letters && letters[guess[i]].length !== 0) {
      tiles[i] = '🟨'
      letters[guess[i]].shift() // removes first element of letters[guess[i]]
    }
  }

  const toReturn = tiles.join('')
  // logger.info(toReturn)
  return toReturn
}

module.exports = simulator
