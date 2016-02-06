var path = require('path')
module.exports = {
  db: 'mongodb://localhost/recommender',
  cache: true,
  numSimilar: 30,
  sentencesFile: path.join(__dirname, '../sentences-random.txt'),
  outputFile: path.join(__dirname, '../vectors.txt')
}
