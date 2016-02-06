var css = require('dom-css')
var EventEmitter = require('events').EventEmitter

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600
  var events = new EventEmitter()

  var about = container.appendChild(document.createElement('div'))
  about.innerHTML = 'about'
  about.className = 'noselect'
  about.id = 'about'

  css(about, {
    fontSize: '150%',
    fontFamily: fonts.code,
    color: colors.brown,
    padding: '10px',
    border: colors.brown + ' solid 3px',
    position: 'absolute',
    bottom: ismobile ? '10px' : '40px',
    left: ismobile ? '10px' : '40px',
    cursor: 'pointer'
  })

  var mover = function (item) {
    css(item.srcElement, {
      background: colors.brown,
      color: colors.white
    })
  }

  var mout = function (item) {
    css(item.srcElement, {
      background: 'none',
      color: colors.brown
    })
  }

  about.onmouseover = mover
  about.onmouseout = mout

  about.onclick = function () {
    events.emit('click')
  }

  return {
    events: events
  }
}