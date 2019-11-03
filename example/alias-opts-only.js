const commandLineUsage = require('../')

const usage = commandLineUsage([
  {
    header: 'Options',
    optionList: [
      {
        description: 'Display this usage guide.',
        alias: 'h',
        type: Boolean
      },
      {
        description: 'Timeout value in ms.',
        alias: 't',
        type: Number,
        typeLabel: '{underline ms}'
      }
    ]
  }
])

console.log(usage)
