const chalk = require('chalk')

function chalkFormat (str) {
  const format = new Function('chalk', `return chalk\`${str}\``)
  return format(chalk)
}

module.exports = chalkFormat
