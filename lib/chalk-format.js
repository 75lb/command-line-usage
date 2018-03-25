const chalk = require('chalk')

function format (str) {
  return chalk(Object.assign([], { raw: [ str ] }))
}

function chalkFormat (str) {
  str = str.replace(/`/g, '\\`')
  return format(str)
}

module.exports = chalkFormat
