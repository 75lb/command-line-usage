import commandLineUsage from 'command-line-usage'
import header from './assets/ansi-header.js'
import chalk from 'chalk'

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
