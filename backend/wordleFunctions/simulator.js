const logger = require('../utils/logger')

const simulator = (guess, answer) => {
  const letters = {} // holds characters and their indices that correspond to yellow and black tiles
  const tiles = ['b', 'b', 'b', 'b', 'b'] // array respresenting the conversion of the guess into colored tiles
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === answer[i]) {
      tiles[i] = 'g'
    } else if (answer[i] in letters) {
      letters[answer[i]].push(i)
    } else {
      letters[answer[i]] = [i]
    }
  }
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] in letters && letters[guess[i]].length !== 0) {
      tiles[i] = 'y'
      letters[guess[i]].shift() // removes first element of letters[guess[i]]
    }
  }

  const toReturn = tiles.join('')
  if (guess === 'soare') {
    logger.info('soare simulator:', toReturn)
  }
  return toReturn
}

module.exports = simulator
