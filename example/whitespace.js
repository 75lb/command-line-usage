'use strict'
const commandLineUsage = require('../')
let sections, usage

/* When using default options, the whitespace before the bullets is trimmed */
sections = [
  {
    header: 'Example app',
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
usage = commandLineUsage(sections)
console.log(usage)

/* Solution 1: Use `raw` option and supply your own whitespace */
sections = [
  {
    header: 'Example app',
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

/* Section 2: use separate sections with the `noTrim` option on the bullets */
sections = [
  {
    header: 'Example app',
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
