/* eslint-disable no-restricted-syntax */
const axios = require('axios')
const logger = require('../utils/logger')

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
  // logger.info(answers[416])
  // logger.info(words.length, answers.length)
  return { words, answers }
}

const wordsRanker = async () => {
  const { words, answers } = await webScraper()
  const rankedWords = {}
  const frequencyRatio = 0
  const wordlebotRatio = 1 - frequencyRatio

  let frequencyDatasetScraper = await axios({
    method: 'get',
    url: 'http://norvig.com/ngrams/count_1w.txt',
  })
  frequencyDatasetScraper = frequencyDatasetScraper.data.split(/\t|\n/)
  let count = words.length
  logger.info('count', frequencyDatasetScraper.length / 2)
  for (let i = 0; i < frequencyDatasetScraper.length / 2; i += 1) {
    const word = frequencyDatasetScraper[2 * i]
    if (word.length === 5 && words.includes(word)) {
      rankedWords[word] = frequencyRatio * count
      count -= 1
    }
  }
  logger.info('frequencyDataset', words.length - count, words.length)

  const wordlebotDatasetScraper = await axios({
    method: 'get',
    url: 'https://static01.nyt.com/newsgraphics/2022/01/25/wordle-solver/274ffc8308fd69c129dd2ef3fc9778bef741775c/words.txt',
  })

  const wordlebotDataset = wordlebotDatasetScraper.data.split('\n').map((line) => line.slice(0, 5))
  count = words.length
  wordlebotDataset.forEach((word) => {
    if (words.includes(word)) {
      if (count > words.length - 200) {
        rankedWords[word] = 2 * wordlebotRatio * count
      } else if (word in rankedWords) {
        rankedWords[word] += wordlebotRatio * count
      } else {
        rankedWords[word] = wordlebotRatio * count
      }
      count -= 1
    }
  })
  logger.info('wordlebot_dataset', words.length - count, words.length)

  const reversedRankedWords = {}
  for (const [key, value] of Object.entries(rankedWords)) {
    reversedRankedWords[value] = key
  }
  logger.info('new length', Object.keys(reversedRankedWords).length)

  const finalRankedWords = []
  const keys = Object.keys(reversedRankedWords)
  keys.sort((a, b) => b - a)
  keys.forEach((score) => finalRankedWords.push(reversedRankedWords[score]))
  logger.info(finalRankedWords)

  return { words: finalRankedWords, answers }
}

module.exports = wordsRanker
