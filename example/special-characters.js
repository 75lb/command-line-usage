const commandLineUsage = require('../')

const sections = [
  {
    header: 'A typical app',
    content: 'A newline: \\\\n. After the newline.'
  }
]
const usage = commandLineUsage(sections)
console.log(usage)
