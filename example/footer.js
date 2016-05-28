const getUsage = require('../')
const wales = require('./assets/ansi-wales')
const optionDefinitions = require('./assets/example-options')

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...',
      '$ example [bold]{--help}'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    content: [
      '[italic]{This app was tested by dragons in Wales.}',
      '',
      wales
    ],
    raw: true
  }
]

console.log(getUsage(sections))
