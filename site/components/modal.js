var css = require('dom-css')

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var modal = container.appendChild(document.createElement('div'))

  var overview = modal.appendChild(document.createElement('div'))
  overview.innerHTML = 'One of the great things about node.js is the ecosystem of composable, reusable modules. But with so many, it can be hard to find what you want, or discover something new! <br><br> To try and help, we trained a machine learning model called <a href="https://code.google.com/archive/p/word2vec/">word2vec</a> on the npm package corpus, treating each module as a "sentence", and its dependencies as "words". <br><br> If you type a package name, you will see packages that tend to be used with it. Click the arrow next to a package to seed a new search.<br><br> The code for this site is on <a href="http://github.com/andrewosh/npm-recommender">github</a>, and is itself powered by cool npm modules, like <a href="https://npmjs.org/package/word2vec">word2vec</a> and <a href="https://npmjs.org/package/cradle">cradle</a>. You can  query it as a service at http://npmrec.com/api/similar/<package>. <br><br>Made by <a href="https://github.com/andrewosh">@andrewosh</a> and <a href="https://github.com/freeman-lab">@freeman-lab</a>. We hope you enjoy it!'
  overview.className = 'noselect'

  css(modal, {
    opacity: 0,
    position: 'absolute',
    margin: '0 auto',
    display: 'table',
    top: '25%',
    left: '20%',
    right: '20%',
    width: '60% ',
    border: colors.brown + ' solid 3px',
    pointerEvents: 'none'
  })

  if (ismobile) {
    css(modal, {left: '10%', right: '10%', width: '80%'})
  }

  css(overview, {
    fontSize: '110%',
    padding: '5%',
    fontFamily: fonts.code,
    color: colors.brown,
    display: 'table-cell'
  })

  return {
    hide: function () {
      css(modal, {opacity: 0, pointerEvents: 'none'})  
    },

    show: function () {
      css(modal, {opacity: 1, pointerEvents: 'all'})  
    }
  }
}