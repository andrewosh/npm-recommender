var css = require('dom-css')
var _ = require('lodash')
var request = require('request')

var similar = function (name, cb) {
  request({
    url: 'http://npmrec.com/api/similar/' + name,
    json: true
  }, function (req, res, body) {
    return cb(null, body)
  })
}

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var box = container.appendChild(document.createElement('div'))
  var topLeft = box.appendChild(document.createElement('div'))
  var topRight = box.appendChild(document.createElement('div'))
  var bottomLeft = box.appendChild(document.createElement('div'))
  var bottomRight = box.appendChild(document.createElement('div'))

  css(box, {
    position: 'absolute',
    margin: '0 auto',
    left: '0%',
    right: '4%',
    width: '96%',
    top: '20%',
    height: '60%'
  })

  css(topLeft, {
    width: '49%',
    height: ismobile ? '15%' : '20%',
    display: 'inline-block'
  })

  css(topRight, {
    width: '51%',
    height: ismobile ? '15%' : '20%',
    display: 'inline-block'
  })

  css(bottomLeft, {
    width: '49%',
    height: ismobile ? '85%' : '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  css(bottomRight, {
    top: 0,
    width: '51%',
    height: ismobile ? '85%' : '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  var welcome = topLeft.appendChild(document.createElement('div'))
  var welcomeText = welcome.appendChild(document.createElement('span'))
  var prompt = bottomLeft.appendChild(document.createElement('div'))
  var promptText = prompt.appendChild(document.createElement('span'))
  var input = topRight.appendChild(document.createElement('input'))
  var output = bottomRight.appendChild(document.createElement('div'))
  input.id = 'input'
  input.className = 'negative'
  input.contentEditable = true
  input.placeholder = 'package'
  input.innerHTML = 'module name'
  welcomeText.innerHTML = 'if you use'
  welcomeText.className = 'noselect'
  promptText.className = 'noselect'
  promptText.innerHTML = 'check out'

  css(welcome, {
    textAlign: 'right'
  })

  css(prompt, {
    textAlign: 'right'
  })

  css(welcomeText, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    textAlign: 'right',
    marginRight: '10%',
    fontSize: '165%'
  })

  css(promptText, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    textAlign: 'right',
    marginRight: '10%',
    fontSize: '165%'
  })

  css(input, {
    color: colors.brown,
    fontFamily: fonts.code,
    paddingBottom: '3px',
    background: 'none',
    fontSize: '165%',
    border: 'none',
    width: '75%',
    borderBottom: colors.brown + ' dotted 2px'
  })

  window.onload = function() {
    document.getElementById('input').focus();
  }

  input.onfocus = function () {
    css(input, {
      outline: 'none',
      borderBottom: colors.darkbrown + ' dotted 2px'
    })
  }

  input.onblur = function () {
    css(input, {
      outline: 'none',
      borderBottom: colors.brown + ' dotted 2px'
    })
  }

  var moduleList = []
  var descriptionList = []

  var renderMatches = function (start, matches) {
    _.range(start, start + 5).forEach(function (i) {
      if (moduleList.length < i + 1) {
        moduleList.push(output.appendChild(document.createElement('div')))
        descriptionList.push(output.appendChild(document.createElement('div')))
        descriptionList[i].className = 'negative'
        moduleList[i].className = 'negative'
        css(moduleList[i], {
          color: colors.brown,
          fontFamily: fonts.code,
          fontWeight: 200,
          paddingBottom: '3px',
          fontSize: '165%',
          width: '75%',
          borderBottom: colors.brown + ' dotted 2px',
          marginBottom: '1%'
        })

        css(descriptionList[i], {
          color: colors.brown,
          fontFamily: fonts.code,
          fontWeight: 200,
          paddingBottom: '3px',
          fontSize: '75%',
          width: '75%',
          marginBottom: '2%'
        })
      }
      moduleList[i].innerHTML = matches[i].word
      var description = matches[i].description
      var shortDesc = description.slice(0, 72)
      if (description.length > 73) {
        shortDesc = shortDesc.slice(0, 69) + '...'
      }
      descriptionList[i].innerHTML = shortDesc
    })
  }
  
  var throttledSimilar = _.throttle(similar, 250)

  input.oninput(function () {
    var name = input.innerHTML
    throttledSimilar(name, function (err, matches) {
      if (err) return err
      renderMatches(0, matches)
   })
  })
}
