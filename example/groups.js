const getUsage = require('../')

const optionDefinitions = [
  {
    name: 'help', description: 'Display this usage guide.',
    alias: 'h', type: Boolean,
    group: 'main'
  },
  {
    name: 'src', description: 'The input files to process',
    type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...',
    group: 'main'
  },
  {
    name: 'timeout', description: 'Timeout value in ms',
    alias: 't', type: Number, typeLabel: '[underline]{ms}',
    group: 'main'
  },
  {
    name: 'plugin', description: 'A plugin path',
    type: String
  }
]

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Main options',
    optionList: optionDefinitions,
    group: 'main'
  },
  {
    header: 'Misc',
    optionList: optionDefinitions,
    group: '_none'
  }
]

console.log(getUsage(sections))
