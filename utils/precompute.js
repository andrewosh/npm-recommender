var async = require('async')
var request = require('request')
var ProgressBar = require('progress')
var mongoose = require('mongoose')
var format = require('string-format')
format.extend(String.prototype)

var PackageInfo = require('../lib/package-info.js')
var settings = require('../conf/main.js')

mongoose.connect(settings.db)

var precompute = function () {
  PackageInfo.count(function (err, total) {
    if (err) throw err
    console.log('Precomputing similarities for {0} packages...'.format(total))
    var bar = new ProgressBar(':bar :current/:total', { total: total })
    var processed = 0
    var timer = setInterval(function () {
      bar.tick(processed)
      processed = 0
      if (bar.complete) {
        clearInterval(timer)
      }
    }, 100)
    PackageInfo.find().select('name').exec(function (err, packages) {
      if (err) throw err
      async.eachLimit(packages, 10000, function (pkg, next) {
        request({
          url: 'http://localhost:8080/api/similar/' + pkg.name,
          json: true
        }, function (err, rsp, body) {
          if (err) throw err
          processed += 1
          return next(null)
        })
      }, function (err) {
        if (err) throw err
        return
      })
    })
  })
}

precompute()
