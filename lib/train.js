var path = require('path')

var async = require('async')
var mongoose = require('mongoose')
var ProgressBar = require('progress')
var w2v = require('word2vec')
var format = require('string-format')
format.extend(String.prototype)

var settings = require('../conf/main.js')
var PackageInfo = require('./package-info.js')

mongoose.connect(settings.db)

var train = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  opts = opts || {}
  console.log('Training word2vec model...')
  w2v.word2vec(settings.sentencesFile, settings.outputFile, {
    minCount: 0,
    cbow: 0,
    iter: 10
  }, function (err) {
    console.log('Finished training word2vec model')
    if (cb) {
      return cb(err)
    }
  })
}

var precomputeMostSimilar = function (opts, cb) {
  var numSimilar = opts.numSimilar || 30
  var loadModel = function (next) {
    w2v.loadModel(settings.outputFile, function (err, model) {
      if (err) return next(err)
      return next(null, model)
    })
  }
  var getCount = function (model, next) {
    PackageInfo.count(function (err, total) {
      if (err) return next(err)
      return next(null, model, total)
    })
  }
  var precompute = function (model, total, next) {
    console.log('Precomputing {0} most similar packages for {1} packages'.format(numSimilar, total))
    var bar = new ProgressBar(':bar :current/:total', { total: total, clear: true })
    var processed = 0
    var timer = setInterval(function () {
      bar.tick(processed)
      processed = 0
      if (bar.complete) {
        console.log('\n Finished precomputing most similar packages!\n')
        clearInterval(timer)
      }
    }, 100)
    var allPackages = PackageInfo.find().stream()
    allPackages.on('data', function (doc) {
      var name = doc.name
      var mostSimilar = model.mostSimilar(name, numSimilar)
      PackageInfo.update({ name: name }, { similar: mostSimilar })
      processed += 1
    })
    allPackages.on('error', function (err) {
      return next(err)
    })
    allPackages.on('close', function () {
      return next(null)
    })
  }
  async.waterfall([
    loadModel,
    getCount,
    precompute
  ], function (err) {
    return cb(err)
  })
}

if (require.main === module) {
  async.series([
    train,
    precomputeMostSimilar
  ])
} else {
  module.exports = train
}

