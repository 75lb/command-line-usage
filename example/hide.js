const commandLineUsage = require('../')

const usage = commandLineUsage([
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Synopsis',
    content: '$ example <options> {underline file} {underline ...}'
  },
  {
    header: 'Options',
    hide: [ 'src' ],
    optionList: [
      {
        name: 'help',
        description: 'Display this usage guide.',
        alias: 'h',
        type: Boolean
      },
      {
        name: 'src',
        description: 'The input files to process. This is some additional text existing solely to demonstrate word-wrapping, nothing more, nothing less. And nothing in between.',
        type: String,
        multiple: true,
        defaultOption: true,
        typeLabel: '{underline file} ...'
      },
      {
        name: 'timeout',
        description: 'Timeout value in ms.',
        alias: 't',
        type: Number,
        typeLabel: '{underline ms}'
      }
    ]
  },
  {
    content: 'Project home: {underline https://github.com/me/example}'
  }
])

console.log(usage)
