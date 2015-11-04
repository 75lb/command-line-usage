const clu = require('../')

const definitions = [
  {
    name: 'help', description: 'Display this usage guide.',
    alias: 'h', type: Boolean
  },
  {
    name: 'src', description: 'The input files to process',
    type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
  },
  {
    name: 'timeout', description: 'Timeout value in ms. This description is needlessly long unless you count testing of the description column maxWidth useful.',
    alias: 't', type: Number, typeLabel: '[underline]{ms}'
  }
]

const usage =
`
Name:         typical-app

Description:  If you like, write your own usage template. If you would still like a
              generated option list, use .getOptionList().

Usage:

${clu.getOptionList(definitions).join('\n')}

`

console.log(usage)
