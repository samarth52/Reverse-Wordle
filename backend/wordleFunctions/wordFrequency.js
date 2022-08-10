const fs = require('fs')
const webScraper = require('./webScraper')
const logger = require('../utils/logger')

const checkInclusion = async () => {
  const { words } = await webScraper()
  fs.readFile('../../../../Downloads/unigram_freq.csv', (err, data) => {
    logger.info(words.filter((word) => data.indexOf(word) === -1))
  })
}

module.exports = checkInclusion

checkInclusion()
