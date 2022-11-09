const chalk = require('chalk')

function chalkFormat (str, options) {
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
