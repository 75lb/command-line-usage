const commandLineUsage = require('../')

const sections = [
  {
    header: 'a header only'
  },
  {
    content: 'content only'
  }
]

console.log(commandLineUsage(sections))
