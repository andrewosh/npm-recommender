var mongoose = require('mongoose')

module.exports = mongoose.model('PackageInfo', {
  name: { type: String, unique: true },
  version: String,
  dependencies: [String],
  author: String,
  license: String,
  repo: String,
  description: String,
  similar: [{
    word: String,
    description: String,
    dist: Number
  }]
})
