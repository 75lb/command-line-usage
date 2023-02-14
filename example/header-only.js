import commandLineUsage from 'command-line-usage'

const sections = [
  {
    header: 'a header only'
  },
  {
    content: 'content only'
  }
]

console.log(commandLineUsage(sections))
