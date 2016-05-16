const getUsage = require('../')
const header = require('./assets/ansi-header')
const ansi = require('ansi-escape-sequences')
const optionDefinitions = require('./assets/example-options')

const sections = [
  {
    banner: ansi.format(header, 'red')
  },
  {
    header: 'Synopsis',
    content: [
      '$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...',
      '$ example [bold]{--help}'
    ]
  }
]

console.log(getUsage(sections))
