var fs = require('fs')
var path = require('path')

var ProgressBar = require('progress')
var random = require('random-js')()

var settings = require('../conf/main.js')

var iterations = 3000000

var shuffle = function () {
  var bar = new ProgressBar(':bar :current/:total', { total: iterations, clear: true })
  var lines = fs.readFileSync(settings.sentencesFile).toString().split('\n')
  var numLines = lines.length
  var i = 0
  var c = 0
  for (i; i < iterations; i++) {
    var linePos1 = random.integer(0, numLines - 1)
    var linePos2 = random.integer(0, numLines - 1)
    var first = lines[linePos1].split(' ')
    var second = lines[linePos2].split(' ')
    var pos1 = random.integer(0, first.length - 1)
    var pos2 = random.integer(0, second.length - 1)
    var temp = first[pos1]
    first[pos1] = second[pos2]
    second[pos2] = temp
    lines[linePos1] = first.join(' ')
    lines[linePos2] = second.join(' ')
    c += 1
  }
  var timer = setInterval(function () {
    bar.tick(c)
    c = 0
    if (bar.complete) {
      console.log('Finished shuffling words!')
      clearInterval(timer)
    }
  }, 100)
  fs.writeFile(path.join(__dirname, '../sentences-shuffled.txt'), lines.join('\n'), function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

if (require.main === module) {
  shuffle()
} else {
  module.exports = shuffle
}
