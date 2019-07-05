const commandLineUsage = require('../')
const header = require('./assets/ansi-header')
const chalk = require('chalk')

const sections = [
  {
    content: chalk.red(header),
    raw: true
  },
  {
    header: 'Synopsis',
    content: [
      '$ example [{bold --timeout} {underline ms}] {bold --src} {underline file} ...',
      '$ example {bold --help}'
    ]
  }
]

console.log(commandLineUsage(sections))
