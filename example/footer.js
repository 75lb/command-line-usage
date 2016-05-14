const getUsage = require('../')
const wales = require('./assets/ansi-wales')

const optionDefinitions = [
  {
    name: 'help', description: 'Display this usage guide.',
    alias: 'h', type: Boolean
  },
  {
    name: 'src', description: 'The input files to process',
    type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
  },
  {
    name: 'timeout', description: 'Timeout value in ms',
    alias: 't', type: Number, typeLabel: '[underline]{ms}'
  }
]

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
    banner: [
      '[italic]{This app was tested by dragons in Wales.}',
      '',
      wales
    ]
  }
]

console.log(getUsage(sections))
