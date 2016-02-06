var express = require('express')
var w2v = require('word2vec')
var mongoose = require('mongoose')
var winston = require('winston')
winston.add(winston.transports.File, { filename: 'npm-recommender.log' })

var PackageInfo = require('./package-info.js')
var settings = require('../conf/main.js')

mongoose.connect(settings.db)

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  app.get('/api/mostSimilar/:package', function (req, res) {
    var pkg = req.params.package
    winston.info('mostSimilar/' + pkg)
    PackageInfo.findOne({ name: pkg }, function (err, doc) {
      if (err) return res.status(500).send(err)
      res.json(doc.similar).end()
    })
  })
  app.listen(port, function () {
    console.log('Serving npm-recommender API on port', port)
  })
}

if (require.main === module) {
  start()
} else {
  module.exports = start
}

