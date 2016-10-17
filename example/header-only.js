const getUsage = require('../')

const sections = [
  {
    header: 'a header only'
  },
  {
    content: 'content only'
  }
]

console.log(getUsage(sections))
