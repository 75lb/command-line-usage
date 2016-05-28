const getUsage = require('../');

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ typical <options> <files>',
      '$ cat <files> | typical <options>'
    ]
  }
]
const usage = getUsage(sections)

console.log(usage)
