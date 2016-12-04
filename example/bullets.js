'use strict'
const commandLineUsage = require('../')
let sections, usage

/* Using default options - whitespace is trimmed */
sections = [
  {
    header: 'Using default options - whitespace is trimmed',
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

/* Using `raw` option and supplying your own whitespace */
sections = [
  {
    header: 'Using `raw` option and supplying your own whitespace',
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

/* Using `raw` option and supplying your own whitespace (single multiline string) */
sections = [
  {
    header: 'Using `raw` option and supplying your own whitespace (single multiline string)',
    content: [
      '  Generates something [italic]{very} important. This description is:',
      '  ',
      '    • rather long',
      '    • inconsequential',
      '    • demonstrative',
      '  ',
      '  And the text continues underneath as this [cyan]{might} be required in cases where',
      '  text is required underneath.'
    ].join('\n'),
    raw: true
  }
]
usage = commandLineUsage(sections)
console.log(usage)

/* using separate sections, and the `noTrim` option on the bullets */
sections = [
  {
    header: 'using separate sections, and the `noTrim` option on the bullets',
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
