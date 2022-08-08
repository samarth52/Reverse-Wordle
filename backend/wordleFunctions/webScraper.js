const axios = require('axios')
// const logger = require('../utils/logger')

const webScraper = async () => {
  const script = await axios({
    method: 'get',
    url: 'https://www.nytimes.com/games-assets/v2/wordle.7f410df5d01006fe7e57b1fc1b0c063f7f6c3d3e.js',
  })
  const { data } = script
  let words = Array.from(data.match(/be=\[(.+?)\]/))
  words = words[1].split(',').map((word) => word.slice(1, -1))
  let answers = Array.from(data.match(/he=\[(.+?)\]/))
  answers = answers[1].split(',').map((word) => word.slice(1, -1))
  words = words.concat(answers)
  // logger.info(words)
  // logger.info(answers)
  // logger.info(answers[416])
  return { answers, words }
}

module.exports = webScraper
