var css = require('dom-css')
var _ = require('lodash')

module.exports = function (container, opts) {
  var colors = opts.colors
  var fonts = opts.fonts

  var box = container.appendChild(document.createElement('div'))
  var topLeft = box.appendChild(document.createElement('div'))
  var topRight = box.appendChild(document.createElement('div'))
  var bottomLeft = box.appendChild(document.createElement('div'))
  var bottomRight = box.appendChild(document.createElement('div'))

  css(box, {
    position: 'absolute',
    margin: '0 auto',
    left: '0%',
    right: '4%',
    width: '96%',
    top: '20%',
    height: '60%'
  })

  css(topLeft, {
    width: '50%',
    height: '20%',
    display: 'inline-block'
  })

  css(topRight, {
    width: '50%',
    height: '20%',
    display: 'inline-block'
  })

  css(bottomLeft, {
    width: '50%',
    height: '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  css(bottomRight, {
    top: 0,
    width: '50%',
    height: '80%',
    display: 'inline-block',
    verticalAlign: 'top'
  })

  var welcome = topLeft.appendChild(document.createElement('div'))
  var welcomeText = welcome.appendChild(document.createElement('span'))
  var prompt = bottomLeft.appendChild(document.createElement('div'))
  var promptText = prompt.appendChild(document.createElement('span'))
  var input = topRight.appendChild(document.createElement('input'))
  var output = bottomRight.appendChild(document.createElement('div'))
  input.id = 'input'
  input.className = 'negative'
  input.contentEditable = true
  input.placeholder = 'package'
  input.innerHTML = 'module name'
  welcomeText.innerHTML = 'if you use'
  welcomeText.className = 'noselect'
  promptText.className = 'noselect'
  promptText.innerHTML = 'check out'

  css(welcome, {
    textAlign: 'right'
  })

  css(prompt, {
    textAlign: 'right'
  })

  css(welcomeText, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    textAlign: 'right',
    marginRight: '10%',
    fontSize: '175%'
  })

  css(promptText, {
    color: colors.white,
    borderBottom: colors.white + ' dotted 2px',
    fontFamily: fonts.code,
    paddingBottom: '3px',
    textAlign: 'right',
    marginRight: '10%',
    fontSize: '175%'
  })

  css(input, {
    color: colors.brown,
    fontFamily: fonts.code,
    paddingBottom: '3px',
    background: 'none',
    fontSize: '175%',
    border: 'none',
    width: '75%',
    borderBottom: colors.brown + ' dotted 2px'
  })

  window.onload = function() {
    document.getElementById('input').focus();
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

  moduleList = []
  descriptionList = []

  _.range(5).forEach(function (i) {
    moduleList.push(output.appendChild(document.createElement('div')))
    descriptionList.push(output.appendChild(document.createElement('div')))
    moduleList[i].innerHTML = 'browserify'
    moduleList[i].className = 'negative',
    descriptionList[i].innerHTML = 'browser-side require() the node way'
    descriptionList[i].className = 'negative',

    css(moduleList[i], {
      color: colors.brown,
      fontFamily: fonts.code,
      fontWeight: 200,
      paddingBottom: '3px',
      fontSize: '175%',
      width: '75%',
      borderBottom: colors.brown + ' dotted 2px',
      marginBottom: '1%'
    })

    css(descriptionList[i], {
      color: colors.brown,
      fontFamily: fonts.code,
      fontWeight: 200,
      paddingBottom: '3px',
      fontSize: '80%',
      width: '75%',
      marginBottom: '2%'
    })
  })
}