var _ = require('lodash')
var async = require('async')
var jsonfile = require('jsonfile')
var path = require('path')
var cradle = require('cradle')
var ProgressBar = require('progress')
var format = require('string-format')
format.extend(String.prototype)

var settings = require('../conf/main.js')

var download = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  opts = opts || {}

  var connect = function (next) {
    console.log('Connecting to skimdb.npmjs.com/registry...')
    var db = new (cradle.Connection)('https://skimdb.npmjs.com', 443).database('registry')
    db.exists(function (err, exists) {
      if (err) return next(err)
      if (!exists) {
        return next(new Error('Could not check if registry database exists: ' + err))
      }
      return next(null, db)
    })
  }

  var getPackageNames = function (db, next) {
    console.log('Fetching all NPM package names...')
    var couchOpts = opts.limit ? { limit: opts.limit } : null
    db.all(couchOpts, function (err, all) {
      if (err) return next(err) 
      return next(null, db, all)
    })
  }

  var getDependencies = function (db, names, next) {
    console.log('Extracting dependency information from packages...')
    var total = names.length
    var bar = new ProgressBar(':bar :current/:total', {total: total, clear: true}) 
    if (total === 0) {
      return next(null)
    }
    var package = names[0].id
    var processed = 0
    var timer = setInterval(function () {
      bar.tick(processed, { 
        name: package 
      })
      processed = 0
      if (bar.complete) {
        console.log('\nFinished downloading {0} metadata objects!\n'.format(total));
        clearInterval(timer)
      }
    }, 100)
    async.mapLimit(names, 50, function (name, next) {
      if (!name || !name.id) {
        processed += 1
        return next(null)
      }
      db.get(name.id, function (err, doc) {
        if (err) return next(err)
        package = name.id
        if (doc && doc['dist-tags'] && doc.versions) {
          var latest = doc.versions[doc['dist-tags'].latest]
          if (latest) {
            var depDict = _.merge(latest.dependencies || {}, latest.devDependencies)
            // discard versions for now
            var deps = _.keys(depDict)
            processed += 1
            return next(null, deps)
          }
          processed += 1
          return next(null)
        } 
        processed += 1
        return next(null)
      })
    }, function (err, deps) {
      if (err) return next(err)
      var justNames = _.map(names, 'id')
      var zipped = _.zipObject(justNames, deps)
      return next(null, _.omitBy(zipped, function (obj) {
        return _.isNull(obj) || _.isUndefined(obj)
      }))
    })
  }

  var writeDependencies = function (deps, next) {
    var file = settings.jsonFile
    console.log('Writing JSON-formatted dependencies to', file, '...')
    jsonfile.writeFile(file, deps, { spaces: 2 }, function (err) {
      if (err) return next(err)
      console.log('Writing text-formatted depenencies to', file, '...')
      var text = _.map(_.values(deps), function (dep) { 
        return dep.join()
      fs.writeFile(settings.sentencesFile, _.map(_.values(deps)
      return next(err)
    })
  }

  async.waterfall([
    connect,
    getPackageNames,
    getDependencies,
    writeDependencies
  ], function (err) {
    if (err) {
      console.error('Could not download NPM package metadata: ', err)
    } else {
      console.log('NPM package metadata has been saved!')
    }
    if (cb) {
      return cb(err)
    }
    return
  })
}

if (require.main === module) {
  download({ limit: 5000 })
} else {
  module.exports = download
}
