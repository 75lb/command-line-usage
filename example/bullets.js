'use strict'
const commandLineUsage = require('../')
let sections, usage

/* Using default options  */
sections = [
  {
    header: 'Example App',
    content: [
      'Generates something [italic]{very} important. This description is:',
      '',
      '  • rather long',
      '  • inconsequential',
      '  • demonstrative',
      '',
      'And the text continues underneath as this [cyan]{might} be required in cases where text is required underneath.'
    ]
  }
]

/* Using `raw` option and supplying your own whitespace */

usage = commandLineUsage(sections)
console.log(usage)

sections = [
  {
    header: 'Example App',
    content: [
      '  Generates something [italic]{very} important. This description is:',
      '  ',
      '    • rather long',
      '    • inconsequential',
      '    • demonstrative',
      '  ',
      '  And the text continues underneath as this [cyan]{might} be required in cases where',
      '  text is required underneath.'
    ],
    raw: true
  }
]

usage = commandLineUsage(sections)
console.log(usage)

/* using separate sections, and the `noTrim` option were appropriate */

sections = [
  {
    header: 'Example App',
    content: [
      'Generates something [italic]{very} important. This description is:',
    ]
  },
  {
    content: {
      options: {
        noTrim: true
      },
      data: [
        { col: '  • rather long' },
        { col: '  • inconsequential' },
        { col: '  • demonstrative' }
      ]
    }
  },
  {
    content: [
      'And the text continues underneath as this [cyan]{might} be required in cases where text is required underneath.'
    ]
  }
]

usage = commandLineUsage(sections)
console.log(usage)
