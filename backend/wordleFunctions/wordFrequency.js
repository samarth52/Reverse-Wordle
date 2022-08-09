const fs = require('fs')
const webScraper = require('./webScraper')

const checkInclusion = async () => {
  const { words } = await webScraper()
  fs.readFile('../../../../Downloads/unigram_freq.csv', (err, data) => {
    console.log(words.filter((word) => data.indexOf(word) === -1))
  })
}

module.exports = checkInclusion

checkInclusion()
