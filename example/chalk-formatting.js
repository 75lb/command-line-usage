const getUsage = require('../')

const usage = getUsage([
  {
    header: 'A typical app',
    content: 'Generates something {italic.keyword("orange") very {rgb(255,231,0).bold important}}. This is a rather long, but {hex("#1ef").underline ultimately} inconsequential description intended {yellow.bgRed.bold solely {bgBlue to}} demonstrate description appearance. '
  },
  {
    header: 'Options',
    optionList: [
      { name: 'files', typeLabel: '{magenta {underline files}}', description: 'This is {red red}.'}
    ]
  },
  {
    content: 'Project home: {underline https://github.com/me/example}'
  }
])

console.log(usage)
