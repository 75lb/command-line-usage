const chalk = require('chalk')

function chalkFormat (str) {
  str = str.replace(/`/g, '\\`')
  const format = new Function('chalk', `'use strict'; return chalk\`${str}\``)
  return format(chalk)
}

module.exports = chalkFormat
