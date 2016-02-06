var css = require('dom-css')
var _ = require('lodash')
var request = require('browser-request')

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
  var top = box.appendChild(document.createElement('div'))
  var bottom = box.appendChild(document.createElement('div'))

  css(box, {
    position: 'absolute',
    margin: '0 auto',
    left: ismobile ? '4%' : '20%',
    right: ismobile ? '1%' : '14%',
    width: ismobile ? '95%' : '66%',
    top: '18%',
    height: '70%'
  })

  css(top, {
    width: '100%',
    height: '15%',
    display: 'inline-block'
  })

  css(bottom, {
    top: 0,
    width: '100%',
    height: ismobile ? '85%' : '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  var welcome = top.appendChild(document.createElement('span'))
  var input = top.appendChild(document.createElement('input'))
  var prompt = top.appendChild(document.createElement('span'))

  var output = bottom.appendChild(document.createElement('div'))
  input.id = 'input'
  input.className = 'negative'
  input.contentEditable = true
  input.placeholder = 'package'
  welcome.innerHTML = 'if you use'
  welcome.className = 'noselect'
  prompt.className = 'noselect'
  prompt.innerHTML = 'check out'

  css(welcome, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    paddingRight: '2%',
    marginRight: '5%',
    textAlign: 'right',
    fontSize: '145%'
  })

  css(prompt, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    paddingRight: '2%',
    textAlign: 'left',
    fontSize: '145%'
  })

  css(input, {
    color: colors.brown,
    fontFamily: fonts.code,
    width: '35%',
    paddingBottom: '3px',
    paddingRight: '2%',
    marginRight: '5%',
    background: 'none',
    fontSize: '145%',
    border: 'none',
    borderBottom: colors.brown + ' dotted 2px'
  })

  window.onload = function() {
    document.getElementById('input').focus()
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
  var itemName
  var itemDescription

  var renderMatches = function (start, matches) {
    _.range(start, start + 10).forEach(function (i) {
      if (moduleList.length < i + 1) {
        moduleList.push(output.appendChild(document.createElement('div')))
        itemName = moduleList[i].appendChild(document.createElement('div'))
        itemDescription = moduleList[i].appendChild(document.createElement('div'))
        itemDescription.className = 'negative'
        itemName.className = 'negative'
        itemName.innerHTML = matches[i].word
        itemLink = itemName.appendChild(document.createElement('span'))
        itemLink.innerHTML = '>'
        itemLink.className = 'noselect'

        var description = matches[i].description
        if (description) {
          var shortDesc = description.slice(0, 72)
          if (description.length > 73) {
            shortDesc = shortDesc.slice(0, 69) + '...'
          }
          itemDescription.innerHTML = shortDesc
        } else {
          itemDescription.innerHTML = ''
        }

        itemName.onclick = function () {
          window.open('https://npmjs.org/package/' + matches[i].word)
        }

        itemLink.onclick = function (event) {
          event.stopPropagation()
          input.value = matches[i].word
        }

        css(moduleList[i], {
          width: '45%',
          height: '18%',
          marginBottom: '2%',
          marginRight: '5%',
          display: 'inline-block',
          verticalAlign: 'top'      
        })

        css(itemName, {
          color: colors.brown,
          fontFamily: fonts.code,
          fontWeight: 200,
          paddingBottom: '3px',
          fontSize: '145%',
          borderBottom: colors.brown + ' dotted 2px',
          marginBottom: '2%',
          textDecoration: 'none',
          cursor: 'pointer'
        })

        css(itemLink, {
          color: colors.brown,
          fontFamily: fonts.code,
          fontWeight: 200,
          fontSize: '80%',
          paddingLeft: '4%',
          textDecoration: 'none',
          opacity: 0.5,
          cursor: 'pointer'
        })

        css(itemDescription, {
          color: colors.brown,
          fontFamily: fonts.code,
          fontWeight: 200,
          paddingBottom: '3px',
          fontSize: '75%'
        })
      }
    })
  }
  
  var throttledSimilar = _.throttle(similar, 250)

  input.oninput = function () {
    var name = input.value
    // var matches = require('./example.js')
    // renderMatches(0, matches)
    throttledSimilar(name, function (err, matches) {
      if (err) return err
      renderMatches(0, matches)
    })
  }

  return {
    hide: function () {
      css(box, {opacity: 0.0})
    },
    show: function () {
      css(box, {opacity: 1.0})
    }
  }
}
