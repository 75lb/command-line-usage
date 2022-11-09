const chalk = require('chalk')

function chalkFormat (str, options) {
  options = options || { useChalk : true }
  if (str) {
    str = str.replace(/`/g, '\\`')
    return options.useChalk
      ? chalk(Object.assign([], { raw: [str] }))
      : str
  } else {
    return ''
  }
}

module.exports = chalkFormat
