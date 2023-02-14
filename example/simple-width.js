import commandLineUsage from 'command-line-usage'
const optionDefinitions = require('./assets/example-options')

const usage = commandLineUsage([
  {
    header: 'A typical app',
    content: {
      options: { maxWidth: 40 },
      data: [
        { col: 'Generates something {italic very} important. This is a rather long, but ultimately inconsequential description intended solely to demonstrate description appearance. ' }
      ]
    }
  }
])

console.log(usage)
