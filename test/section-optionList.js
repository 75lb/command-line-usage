const Tom = require('test-runner').Tom
const commandLineUsage = require('../')
const a = require('assert')

const tom = module.exports = new Tom('section-optionList')

tom.test('commandLineUsage(sections): typical', function () {
  const definitions = [
    {
      name: 'help',
      description: 'Display this usage guide.',
      alias: 'h',
      type: Boolean,
      group: 'one'
    },
    {
      name: 'src',
      description: 'The input files to process',
      type: String,
      multiple: true,
      defaultOption: true,
      group: 'one'
    },
    {
      name: 'timeout',
      description: 'Timeout value in ms',
      alias: 't',
      type: Number
    }
  ]

  const sections = [
    {
      header: 'a typical app',
      content: 'Generates something very important.'
    },
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/a typical app/.test(result))
  a.ok(/Generates something very important/.test(result))
  a.ok(/Display this usage guide/.test(result))
  a.ok(/\u001b\[1m-t\u001b\[22m, \u001b\[1m--timeout\u001b\[22m/.test(result))
})

tom.test('reverseNameOrder', function () {
  const sections = [
    {
      header: 'Option list',
      optionList: [
        {
          name: 'timeout',
          description: 'Timeout value in ms',
          alias: 't',
          type: Number
        }
      ],
      reverseNameOrder: true
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/\u001b\[1m--timeout\u001b\[22m, \u001b\[1m-t\u001b\[22m/.test(result))
})

tom.test('optionDefinition with no description', function () {
  const usage = commandLineUsage([
    {
      optionList: [
        { name: 'one' }
      ]
    }
  ])
  a.ok(/one/.test(usage))
})

tom.test('optionDefinition with no name', function () {
  a.throws(() => {
    const usage = commandLineUsage([
      {
        optionList: [
          { description: 'something' }
        ]
      }
    ])
  })
})

tom.test('omit String, correct typeLabel', function () {
  const definitions = [
    {
      name: 'src',
      description: 'The input files to process'
    }
  ]

  const sections = [
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/--src\u001b\[22m \u001b\[4mstring/.test(result))
})

tom.test('omit String, correct typeLabel, multiple', function () {
  const definitions = [
    {
      name: 'src',
      description: 'The input files to process',
      multiple: true
    }
  ]

  const sections = [
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/--src\u001b\[22m \u001b\[4mstring\[\]/.test(result))
})

tom.test('omit String, correct typeLabel, lazyMultiple', function () {
  const definitions = [
    {
      name: 'src',
      description: 'The input files to process',
      lazyMultiple: true
    }
  ]

  const sections = [
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/--src\u001b\[22m \u001b\[4mstring\[\]/.test(result))
})

tom.test('type Number, correct typeLabel, lazyMultiple', function () {
  const definitions = [
    {
      name: 'src',
      description: 'The input files to process',
      type: Number,
      lazyMultiple: true
    }
  ]

  const sections = [
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/--src\u001b\[22m \u001b\[4mnumber\[\]/.test(result))
})
