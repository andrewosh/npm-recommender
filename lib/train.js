var path = require('path')

var w2v = require('word2vec')

var settings = require('../conf/main.js')

var train = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  opts = opts || {}
  console.log('Training word2vec model...')
  var randomized = path.join(__dirname, '../sentences-random.txt')
  w2v.word2vec(randomized, settings.outputFile, {
    minCount: 0,
    cbow: 0,
    iter: 10,
  }, function (err) {
    console.log('Finished training word2vec model')
    if (cb) {
      return cb(err)
    }
  })
}

if (require.main === module) {
  train()
} else {
  module.exports = train
}

