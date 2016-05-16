var test = require('tape')
var getUsage = require('../')

test('getUsage(sections)', function (t) {
  var definitions = [
    {
      name: 'help', description: 'Display this usage guide.',
      alias: 'h', type: Boolean, group: 'one'
    },
    {
      name: 'src', description: 'The input files to process',
      type: String, multiple: true, defaultOption: true, group: 'one'
    },
    {
      name: 'timeout', description: 'Timeout value in ms',
      alias: 't', type: Number
    }
  ]

  var sections = [
    {
      header: 'a typical app',
      content: 'Generates something very important.'
    },
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  var result = getUsage(sections)
  t.ok(/a typical app/.test(result))
  t.ok(/Generates something very important/.test(result))
  t.ok(/Display this usage guide/.test(result))
  t.end()
})
