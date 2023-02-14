import commandLineUsage from 'command-line-usage'

const usage = commandLineUsage([
  {
    header: 'A typical app',
    content: 'Generates something \\{very important\\}, also retaining `backticks`.'
  },
  {
    header: 'Options',
    optionList: [
      { name: 'files', typeLabel: '\\{something\\}', description: 'This is not \\{red red\\}.'}
    ]
  }
])

console.log(usage)
