var css = require('dom-css')

module.exports = function (container, opts) {

  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var about = container.appendChild(document.createElement('div'))
  about.innerHTML = 'about'
  about.className = 'noselect'

  var github = container.appendChild(document.createElement('a'))
  github.innerHTML = 'github'
  github.className = 'noselect'
  github.href = 'http://github.com/andrewosh/npm-recommender'

  css(about, {
    fontSize: '150%',
    fontFamily: fonts.code,
    color: colors.brown,
    padding: '10px',
    border: colors.brown + ' solid 3px',
    position: 'absolute',
    bottom: '40px',
    left: '40px',
    cursor: 'pointer'
  })

  css(github, {
    fontSize: '150%',
    fontFamily: fonts.code,
    color: colors.brown,
    padding: '10px',
    border: colors.brown + ' solid 3px',
    position: 'absolute',
    bottom: '40px',
    cursor: 'pointer',
    textDecoration: 'none'
  })

  if (ismobile) css(github, {right: '40px'})
  else css(github, {left: '170px'})

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
  github.onmouseover = mover
  about.onmouseout = mout
  github.onmouseout = mout
}