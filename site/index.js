var css = require('dom-css')
var _ = require('lodash')
var fastclick = require('fastclick').FastClick
var ismobile = window.innerWidth < 600
fastclick.attach(document.body)

var opts = {
  colors: {
    'green': 'rgb(117,215,66)',
    'white': 'rgb(252,252,252)',
    'brown': 'rgb(64,65,54)',
    'darkbrown': 'rgb(14,15,4)'
  },
  fonts: {
    'code': 'Hack',
    'plain': 'Cooper Hewitt'
  }
}

var fontSize = '16px'
if (window.innerWidth <= 1000) fontSize = '13px'
if (window.innerWidth <= 900) fontSize = '12px'
if (window.innerWidth <= 800) fontSize = '11px'
if (window.innerWidth <= 600) fontSize = '10px'
if (window.innerWidth <= 400) fontSize = '9px'
if (window.innerWidth <= 350) fontSize = '8px'

var container = document.body.appendChild(document.createElement('div'))

css(document.body, {
  backgroundColor: opts.colors.green,
  fontSize: fontSize,
})

css(container, {
  position: 'relative',
  height: '100%'
})

var main = require('./components/main.js')(container, opts)
var header = require('./components/header.js')(container, opts)
var about = require('./components/about.js')(container, opts)
var modal = require('./components/modal.js')(container, opts)

about.events.on('click', function () {
  modal.show()
  main.hide()
})

window.onclick = function (item) {
  if (!(item.srcElement.localName === 'a') & !(item.srcElement.id === 'about')) {
    modal.hide()
    main.show()  
  }
}