
describe('download', function () {
  it('should download package metadata from the NPM registry', function (done) {
    this.timeout(50000)
    var download = require('../lib/download.js')
    download(function (err, results) {
      if (err) throw err
      done()
    })
  })
})
