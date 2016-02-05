var path = require('path')
module.exports = {
  jsonFile: path.join(__dirname, '../dependencies.json'),
  sentencesFile: path.join(__dirname, '../sentences.txt'),
  outputFile: path.join(__dirname, '../vectors.txt')
}
