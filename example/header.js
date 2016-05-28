const getUsage = require('../')
const header = require('./assets/ansi-header')
const ansi = require('ansi-escape-sequences')

const sections = [
  {
    content: ansi.format(header, 'red'),
    raw: true
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
