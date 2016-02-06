var fs = require('fs')

var _ = require('lodash')
var async = require('async')
var cradle = require('cradle')
var ProgressBar = require('progress')
var mongoose = require('mongoose')
var format = require('string-format')
format.extend(String.prototype)

var settings = require('../conf/main.js')

var download = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  opts = opts || {}

  mongoose.connect(settings.db)
  var PackageInfo = require('./package-info.js')

  var connect = function (next) {
    console.log('Connecting to skimdb.npmjs.com/registry...')
    var db = new (cradle.Connection)('https://skimdb.npmjs.com', 443, {
      cache: false
    }).database('registry')
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
    var bar = new ProgressBar(':bar :current/:total', { total: total, clear: true })
    if (total === 0) {
      return next(null)
    }
    var pkg = names[0].id
    var processed = 0
    var timer = setInterval(function () {
      bar.tick(processed, {
        name: pkg
      })
      processed = 0
      if (bar.complete) {
        clearInterval(timer)
      }
    }, 100)
    async.mapLimit(names, 100000, function (name, next) {
      if (!name || !name.id) {
        processed += 1
        return next(null)
      }
      db.get(name.id, function (err, doc) {
        if (err) return next(err)
        pkg = name.id
        if (doc && doc['dist-tags'] && doc.versions) {
          var version = doc['dist-tags'].latest
          var latest = doc.versions[version]
          if (latest) {
            var depDict = _.merge(latest.dependencies || {}, latest.devDependencies)
            // discard versions for now
            var deps = _.keys(depDict)
            // store the metadata in the mongo database
            var model = {
              name: name.id,
              description: doc.description,
              version: version,
              author: _.get(latest, 'author.name'),
              repo: _.get(latest, 'repository.url'),
              license: _.get(latest, 'license.type'),
              dependencies: deps
            }
            PackageInfo.update({ name: name.id }, model, { upsert: true }, function (err) {
              processed += 1
              if (err) return next(err)
              return next(null, deps)
            })
          } else {
            processed += 1
            return next(null)
          }
        } else {
          processed += 1
          return next(null)
        }
      })
    }, function (err, deps) {
      if (err) return next(err)
      var justNames = _.map(names, 'id')
      var zipped = _.zipObject(justNames, deps)
      console.log('\nFinished downloading {0} metadata objects!\n'.format(total))
      return next(null, _.omitBy(zipped, function (obj) {
        return _.isNull(obj) || _.isUndefined(obj)
      }))
    })
  }

  var writeDependencies = function (deps, next) {
    var file = settings.sentencesFile
    console.log('Writing text-formatted depenencies to', file, '...')
    var withKeys = _.map(deps, function (value, key) {
      value.push(key)
      return value
    })
    var text = _.map(withKeys, function (dep) {
      return dep.join(' ')
    }).join('\n')
    fs.writeFile(file, text, function (err) {
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
    mongoose.disconnect()
    return
  })
}

if (require.main === module) {
  download()
} else {
  module.exports = download
}
