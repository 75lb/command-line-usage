const getUsage = require('../')
const optionDefinitions = require('./assets/example-options')

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...',
      '$ example [bold]{--help}'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. A concise example. ',
        example: '$ example -t 100 lib/*.js'
      },
      {
        desc: '2. A long example. ',
        example: '$ example --timeout 100 --src lib/*.js'
      },
      {
        desc: '3. This example will scan space for unknown things. Take cure when scanning space, it could take some time. ',
        example: '$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts'
      }
    ]
  },
  {
    content: 'Project home: [underline]{https://github.com/me/example}'
  }
]

console.log(getUsage(sections))
