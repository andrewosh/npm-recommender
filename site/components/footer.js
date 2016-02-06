var css = require('dom-css')

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var about = container.appendChild(document.createElement('div'))
  about.innerHTML = 'about'
  about.className = 'noselect'
  about.id = 'about'

  var modal = container.appendChild(document.createElement('div'))

  var overview = modal.appendChild(document.createElement('div'))
  overview.innerHTML = "One of the great things about node.js is the ecosystem of reusable modules. But with so many, it can be hard to find what you want. To help, we trained a machine learning model called word2vec on the npm corpus, treating each module as a sentence, and its dependencies as words. Just type a name, and see related modules. The code is on github, and is itself powered by modules, like word2vec and cradle. Made by @andrewosh and @freeman-lab. Enjoy!"
  overview.className = 'noselect'

  var github = container.appendChild(document.createElement('a'))
  github.innerHTML = 'github'
  github.className = 'noselect'
  github.href = 'http://github.com/andrewosh/npm-recommender'

  css(modal, {
    opacity: 0,
    position: 'absolute',
    display: 'table',
    bottom: '120px',
    left: '40px',
    width: '220px',
    height: '300px',
    pointerEvents: 'none'
  })

  css(overview, {
    fontSize: '75%',
    fontFamily: fonts.code,
    color: colors.brown,
    verticalAlign: 'bottom',
    display: 'table-cell'
  })

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

  if (ismobile) css(modal, {width: '100px'})

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

  about.onclick = function () {
    css(modal, {opacity: 1})
  }

  window.onclick = function (item) {
    if (!(item.srcElement.id === 'about')) {
      console.log(item)
      css(modal, {opacity: 0})  
    }
  }
}