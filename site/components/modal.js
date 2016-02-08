var css = require('dom-css')

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts
  var ismobile = window.innerWidth < 600

  var modal = container.appendChild(document.createElement('div'))

  var overview = modal.appendChild(document.createElement('div'))
  overview.innerHTML = 'One of the great things about node.js is the ecosystem of composable, reusable <a href="https://npmjs.org">npm</a> modules. But with so many, it can be hard to find what you want, or discover something new! <br><br> To try and help, we trained a machine learning model called <a href="https://code.google.com/archive/p/word2vec/">word2vec</a> on the npm package corpus, treating each module as a "sentence", and its dependencies as "words". Type a package name to see packages commonly used with it. Click the arrow next to a package to start a new search.<br><br> All the code for this is on <a href="https://github.com/andrewosh/npm-recommender">github</a>, and is powered by cool modules, like <a href="https://npmjs.org/package/word2vec">word2vec</a> and <a href="https://npmjs.org/package/cradle">cradle</a>. You can  query it at http://npmrec.com/api/similar/<package>. Have a feature idea? Submit a pull request!<br><br>Made by <a href="https://github.com/andrewosh">@andrewosh</a> and <a href="https://github.com/freeman-lab">@freeman-lab</a>. We hope you enjoy it!'
  overview.className = 'noselect'

  css(modal, {
    opacity: 0,
    position: 'absolute',
    margin: '0 auto',
    display: 'table',
    top: '22.5%',
    left: '20%',
    right: '20%',
    width: '60% ',
    border: colors.brown + ' solid 3px',
    pointerEvents: 'none'
  })

  if (ismobile) {
    css(modal, {left: '4.5%', right: '4.5%', width: '91%'})
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