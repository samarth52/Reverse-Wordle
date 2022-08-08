const logger = require('../utils/logger')

const tileParser = (tiles) => {
  const tilePositions = {
    green: [],
    yellow: [],
    black: [],
  }
  Array.from(tiles).forEach((emoji, i) => {
    if (emoji === '🟩') {
      tilePositions.green.push(i)
    } else if (emoji === '🟨') {
      tilePositions.yellow.push(i)
    } else {
      tilePositions.black.push(i)
    }
  })
  logger.info(tiles, tilePositions)
  return tilePositions
}

module.exports = tileParser
