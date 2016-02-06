var css = require('dom-css')
var _ = require('lodash')
var ismobile = window.innerWidth < 600

var opts = {
  colors: {
    'green': 'rgb(117,215,66)',
    'white': 'rgb(242,242,242)',
    'brown': 'rgb(64,65,54)',
    'darkbrown': 'rgb(14,15,4)'
  },
  fonts: {
    'code': 'Hack',
    'plain': 'Cooper Hewitt'
  }
}

var container = document.body.appendChild(document.createElement('div'))

css(document.body, {
  backgroundColor: opts.colors.green,
  fontSize: window.innerWidth < 600 ? (window.innerWidth < 350 ? '9px' : '11px') : '15px',
})

css(container, {
  position: 'relative',
  height: '100%'
})

var main = require('./components/main.js')(container, opts)
var header = require('./components/header.js')(container, opts)
var footer = require('./components/footer.js')(container, opts)