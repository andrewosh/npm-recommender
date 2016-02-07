var css = require('dom-css')
var _ = require('lodash')
var EventEmitter = require('events').EventEmitter

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600
  var events = new EventEmitter()

  var box = container.appendChild(document.createElement('div'))
  var top = box.appendChild(document.createElement('div'))
  var welcome = top.appendChild(document.createElement('span'))
  var input = top.appendChild(document.createElement('input'))
  var prompt = top.appendChild(document.createElement('span'))
  box.id = 'box'
  input.id = 'input'
  input.className = 'negative'
  input.contentEditable = true
  input.placeholder = 'package'
  welcome.innerHTML = 'if you use'
  welcome.className = 'noselect'
  prompt.className = 'noselect'
  prompt.innerHTML = 'check out'

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

  css(welcome, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    paddingRight: '2%',
    marginRight: '5%',
    textAlign: 'right',
    fontSize: '135%',
    letterSpacing: '-0.035em'
  })

  css(prompt, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    paddingRight: '2%',
    textAlign: 'left',
    fontSize: '135%',
    letterSpacing: '-0.035em'
  })

  css(input, {
    color: colors.brown,
    fontFamily: fonts.code,
    width: '35%',
    paddingBottom: '3px',
    paddingRight: '2%',
    marginRight: '5%',
    background: 'none',
    fontSize: '135%',
    border: 'none',
    borderBottom: colors.brown + ' dotted 2px',
    letterSpacing: '-0.035em'
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

  input.oninput = function () {
    events.emit('input', input.value)
  }

  return {
    hide: function () {
      css(box, {opacity: 0.0})
    },
    show: function () {
      css(box, {opacity: 1.0})
    },
    events: events
  }
}
