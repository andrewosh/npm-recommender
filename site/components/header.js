var css = require('dom-css')

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var logo = container.appendChild(document.createElement('img'))
  logo.width = '100'
  logo.src = '../logo-transparent.svg'
  logo.className = 'noselect'

  var name = container.appendChild(document.createElement('img'))
  name.width = '300'
  name.src = '../name-transparent.svg'
  name.className = 'noselect'

  css(logo, {
    position: 'absolute',
    top: '15px',
    left: '25px'
  })

  css(name, {
    position: 'absolute',
    top: '30px',
    right: '20px'
  })

  if (ismobile) {
    logo.width = '60'

    css(logo, {
      margin: '0 auto',
      position: 'absolute',
      right: '0px',
      left: '0px'
    })

    css(name, {
      display: 'none'
    })
  }
}