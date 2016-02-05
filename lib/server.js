var express = require('express')
var w2v = require('word2vec')
var winston = require('winston')

winston.add(winston.transports.File, { filename: 'npm-recommender.log' })

var settings = require('../conf/main.js')

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  winston.info('Loading model...')
  w2v.loadModel(settings.outputFile, function (err, model) {
    if (err) {
      winston.error(err)
      process.exit(1)
    }
    winston.info('Model loaded!')
    app.get('/api/mostSimilar/:package', function (req, res) {
      var pkg = req.params.package
      winston.info('mostSimilar/' + pkg)
      res.json(model.mostSimilar(pkg, 10)).end()
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

