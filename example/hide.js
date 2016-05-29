const getUsage = require('../')
const optionDefinitions = require('./assets/example-options')

const usage = getUsage([
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important. This is a rather long, but ultimately inconsequential description intended solely to demonstrate description appearance. '
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
    hide: 'src'
  },
  {
    content: 'Project home: [underline]{https://github.com/me/example}'
  }
])

console.log(usage)
