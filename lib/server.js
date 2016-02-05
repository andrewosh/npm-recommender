var express = require('express')
var w2v = require('word2vec')

var settings = require('../conf/main.js')

var start = function (opts) {
  opts = opts || {}
  var port = opts.port || 8080
  var app = express()
  w2v.loadModel(settings.outputFile, function (err, model) {
    app.get('/mostSimilar/:package', function (req, res) {
      var package = req.params.package
      res.json(model.mostSimilar(package, 10)).end()
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

