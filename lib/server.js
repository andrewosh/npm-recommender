var _ = require('lodash')
var express = require('express')
var w2v = require('word2vec')
var mongoose = require('mongoose')
var winston = require('winston')
winston.add(winston.transports.File, { filename: 'npm-recommender.log' })
var format = require('string-format')
format.extend(String.prototype)

var PackageInfo = require('./package-info.js')
var settings = require('../conf/main.js')

mongoose.connect(settings.db)

var computeSimilarity = function (model, name, cb) {
  var mostSimilar = model.mostSimilar(name, settings.numSimilar)
  PackageInfo.find().where('name').in(_.map(mostSimilar, 'word')).exec(function (err, docs) {
    if (err) return cb(err)
    var descriptions = _.zipObject(_.map(docs, 'name'), _.map(docs, 'description'))
    _.forEach(mostSimilar, function (entry) {
      entry.description = descriptions[entry.word]
    })
    PackageInfo.update({ name: name }, { similar: mostSimilar }, function (err) {
      if (err) return cb(err)
      return cb(null, mostSimilar)
    })
  })
}

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  console.log('Loading model...')
  w2v.loadModel(settings.outputFile, function (err, model) {
    if (err) return err
    app.get('/api/mostSimilar/:package', function (req, res) {
      var pkg = req.params.package
      winston.info('mostSimilar/' + pkg)
      PackageInfo.findOne({ name: pkg }, function (err, doc) {
        if (err) return res.status(500).send(err)
        var similar = doc.similar
        if (similar && similar.length === settings.numSimilar && settings.cache) {
          winston.info(' mostSimilar already computed for {0} -- serving cached version'.format(pkg))
          return res.json(similar)
        } else {
          winston.info(' mostSimilar NOT computed for {0} -- computing...'.format(pkg))
          computeSimilarity(model, pkg, function (err, similarity) {
            if (err) return res.status(500).send(err)
            return res.json(similarity)
          })
        }
      })
    })
    app.listen(port, function () {
      console.log('Serving npm-recommender API on port', port)
    })
  })
}

if (require.main === module) {
  start()
} else {
  module.exports = start
}

