var css = require('dom-css')
var _ = require('lodash')
var EventEmitter = require('events').EventEmitter

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600
  var events = new EventEmitter()

  var box = document.getElementById('box')
  var bottom = box.appendChild(document.createElement('div'))
  var output = bottom.appendChild(document.createElement('div'))

  css(bottom, {
    top: 0,
    width: '100%',
    height: ismobile ? '85%' : '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  var moduleList = []
  var itemName = []
  var itemDescription = []
  var itemLink = []

  _.range(10).forEach(function (i) {
    moduleList.push(output.appendChild(document.createElement('div')))
    moduleList[i].id = 'module-' + i
    itemName.push(moduleList[i].appendChild(document.createElement('div')))
    itemDescription.push(moduleList[i].appendChild(document.createElement('div')))
    itemDescription[i].className = 'negative'
    itemName[i].className = 'negative'
    itemLink.push(itemName[i].appendChild(document.createElement('span')))
    itemLink[i].innerHTML = '>'
    itemLink[i].className = 'noselect'

    css(moduleList[i], {
      width: '45%',
      height: '18%',
      marginBottom: '2%',
      marginRight: '5%',
      display: 'inline-block',
      verticalAlign: 'top',
      opacity: 0
    })

    css(itemName[i], {
      color: colors.brown,
      fontFamily: fonts.code,
      fontWeight: 200,
      paddingBottom: '3px',
      fontSize: '135%',
      borderBottom: colors.brown + ' dotted 2px',
      marginBottom: '2%',
      textDecoration: 'none',
      cursor: 'pointer',
      letterSpacing: '-0.035em'
    })

    if (ismobile) css(itemName[i], {fontSize: '115%'})

    css(itemLink[i], {
      color: colors.brown,
      fontFamily: fonts.code,
      fontWeight: 200,
      fontSize: '80%',
      paddingLeft: '4%',
      paddingRight: '4%',
      textDecoration: 'none',
      opacity: 0.5,
      cursor: 'pointer'
    })

    css(itemDescription[i], {
      color: colors.brown,
      fontFamily: fonts.code,
      fontWeight: 200,
      paddingBottom: '3px',
      fontSize: '75%'
    })
  })

  function update (matches) {
    _.range(10).forEach(function (i) {
      var k = (i % 2 == 0) ? i / 2 : i + (5 - Math.ceil(i/2))
      itemName[i].innerHTML = matches[k].word
      itemName[i].appendChild(itemLink[i])
      var description = matches[k].description
      if (description) {
        if (description.length > 80) {
          description = description.slice(0, 77) + '...'
        }
        itemDescription[i].innerHTML = description
      } else {
        itemDescription[i].innerHTML = ''
      }

      itemName[i].onclick = function () {
        window.open('https://npmjs.org/package/' + matches[k].word)
      }

      itemLink[i].onclick = function (event) {
        event.stopPropagation()
        input.value = matches[k].word
        events.emit('seed', matches[k].word)
      }
    })
  }

  function hide () {
    if (moduleList.length == 0) return
    _.range(10).forEach(function (i) {
      css(document.getElementById('module-' + i), {opacity: 0})
    })
  }

  function show () {
    if (moduleList.length == 0) return
    _.range(10).forEach(function (i) {
      css(document.getElementById('module-' + i), {opacity: 1})
    })
  }

  return {
    update: update,
    hide: hide,
    show: show,
    events: events
  }

}